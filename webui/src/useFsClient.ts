import { message } from 'antd'
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools'
import mime from 'mime'
import { useEffect, useCallback, useState } from 'react'

import { AppFile, RootDirectory } from '@/types'
import { base64ToByteArray, convertFileToBase64 } from '@/utils'

const methods = {
  in: {
    ping: 'r-ping',
    getRootDirectories: 'r-get-root-directories',
    getFiles: 'r-get-files',
    getFileContent: 'r-get-file-content',
    error: 'error',
    success: 'success',
  },
  out: {
    ping: 'ping',
    getFiles: 'get-files',
    getFileContent: 'get-file-content',
    deleteFile: 'delete-file',
    getRootDirectories: 'get-root-directories',
    uploadFile: 'upload-file',
    newFolder: 'new-folder',
  },
}

type UseClientProps = {
  activePath: string
  setActivePath: (activePath: string) => void
  rootDirectoryType: RootDirectory
}

export function useFsClient({
  activePath,
  setActivePath,
  rootDirectoryType,
}: UseClientProps) {
  const client = useDevToolsPluginClient('file-explorer-expo-dev-plugin')
  const [rootDirectories, setRootDirectories] = useState<Record<
    RootDirectory,
    string
  > | null>(null)
  const [files, setFiles] = useState<AppFile[]>([])

  const fetchFiles = useCallback(() => {
    if (activePath === '') return

    client?.sendMessage(methods.out.getFiles, { path: activePath })
  }, [client, activePath])

  const getFileContent = useCallback(
    (path: string) => {
      client?.sendMessage(methods.out.getFileContent, { path })
    },
    [client]
  )

  const deleteFile = useCallback(
    (path: string) => {
      client?.sendMessage(methods.out.deleteFile, { path })
    },
    [client]
  )

  const uploadFile = useCallback(
    async (file: File) => {
      const base64String = await convertFileToBase64(file)

      client?.sendMessage(methods.out.uploadFile, {
        path: activePath,
        name: encodeURI(file.name),
        base64String,
      })
    },
    [client, activePath]
  )

  const createNewFolder = useCallback(
    (folderName: string) => {
      client?.sendMessage(methods.out.newFolder, {
        path: activePath,
        name: encodeURI(folderName),
      })
    },
    [client, activePath]
  )

  useEffect(() => {
    const subscriptions: EventSubscription[] = []

    if (!client) {
      return
    }

    subscriptions.push(
      client.addMessageListener(methods.in.getFiles, (data) => {
        setFiles(data.files ?? [])
      })
    )

    subscriptions.push(
      client.addMessageListener(methods.in.getRootDirectories, (data) => {
        setRootDirectories(data.rootDirectories)
        setActivePath(data.rootDirectories?.[rootDirectoryType])
      })
    )

    subscriptions.push(
      client.addMessageListener(methods.in.getFileContent, (data) => {
        const blob = new Blob([base64ToByteArray(data.content)], {
          type: mime.getType(data.path) || '',
        })
        const url = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = decodeURI(data.path).split('/').pop() || 'file'
        a.click()

        setTimeout(() => URL.revokeObjectURL(url), 100)
      })
    )

    subscriptions.push(
      client.addMessageListener(methods.in.error, ({ error }) => {
        message.error(error ?? `Unknown error`)
      })
    )

    client.sendMessage(methods.out.getRootDirectories, {})

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove()
      }
    }
  }, [client])

  useEffect(() => {
    const dynamicSubscriptions: EventSubscription[] = []

    if (!client) {
      return
    }

    dynamicSubscriptions.push(
      client.addMessageListener(
        methods.in.success,
        ({ message: messageIn, refresh }) => {
          message.success(messageIn ?? `Success`)
          if (refresh) fetchFiles()
        }
      )
    )

    return () => {
      for (const subscription of dynamicSubscriptions) {
        subscription?.remove()
      }
    }
  }, [client, fetchFiles])

  return {
    files,
    rootDirectories,
    fetchFiles,
    getFileContent,
    deleteFile,
    uploadFile,
    createNewFolder,
  }
}
