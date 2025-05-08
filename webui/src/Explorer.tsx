import { Divider } from 'antd'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'

import { FileList } from './components/FileList'
import { InterractivePath } from './components/InterractivePath'
import { RootPicker } from './components/RootPicker'
import { Toolbar } from './components/Toolbar'
import { AppFile, RootDirectory } from './types'
import { useFsClient } from './useFsClient'

export function Explorer() {
  const [rootDirectoryType, setRootDirectoryType] = useState<RootDirectory>(
    RootDirectory.Document
  )
  const [activePath, setActivePath] = useState<string>('')

  const {
    files,
    rootDirectories,
    fetchFiles,
    getFileContent,
    deleteFile,
    uploadFile,
    createNewFolder,
  } = useFsClient({
    setActivePath,
    rootDirectoryType,
    activePath,
  })

  useEffect(() => {
    fetchFiles()
  }, [activePath, fetchFiles])

  useEffect(() => {
    if (!rootDirectories) return

    setActivePath(rootDirectories[rootDirectoryType])
  }, [rootDirectoryType])

  const sortedFiles = useMemo(() => {
    return files.sort((a, b) => {
      if (a.info.isDirectory && !b.info.isDirectory) {
        return -1
      }
      if (!a.info.isDirectory && b.info.isDirectory) {
        return 1
      }
      return a.name.localeCompare(b.name)
    })
  }, [files])

  const handleItemPress = useCallback(
    (file: AppFile) => {
      if (file.info.isDirectory) {
        setActivePath(file.info.uri)
      }
    },
    [getFileContent, setActivePath]
  )

  const handleItemDelete = useCallback(
    (file: AppFile) => {
      deleteFile(file.info.uri)
    },
    [deleteFile]
  )

  const handleItemDownload = useCallback(
    (file: AppFile) => {
      getFileContent(file.info.uri)
    },
    [getFileContent]
  )

  return (
    <View style={styles.container}>
      <RootPicker
        onRootChange={setRootDirectoryType}
        selectedRoot={rootDirectoryType}
      />
      <View style={styles.content}>
        <Toolbar
          onRefresh={fetchFiles}
          onUpload={uploadFile}
          onNewFolder={createNewFolder}
        />
        <Divider />
        <InterractivePath
          root={rootDirectories?.[rootDirectoryType] ?? ''}
          path={activePath}
          onPathChange={setActivePath}
        />
        <Divider />
        <FileList
          sortedFiles={sortedFiles}
          handleItemPress={handleItemPress}
          handleItemDelete={handleItemDelete}
          handleItemDownload={handleItemDownload}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 32,
    paddingTop: 72,
    gap: 16,
  },
  content: {
    flex: 1,
    width: '100%',
  },
})
