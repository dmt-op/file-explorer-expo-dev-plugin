import {
  UploadOutlined,
  ReloadOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import { Upload, Button } from 'antd'
import { useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { NewFolderModal } from '../modals/NewFolderModal'

type ToolbarProps = {
  onRefresh: () => void
  onUpload: (file: File) => void
  onNewFolder: (name: string) => void
}

export function Toolbar({ onRefresh, onUpload, onNewFolder }: ToolbarProps) {
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)

  const handleBeforeUpload = async (file: File) => {
    onUpload(file)
    return false
  }

  const handleNewFolderButtonClick = useCallback(() => {
    setIsNewFolderModalOpen(true)
  }, [onNewFolder])

  const handleCreateFolder = useCallback(
    (newFolderName: string) => {
      onNewFolder(newFolderName)
      setIsNewFolderModalOpen(false)
    },
    [onNewFolder]
  )

  const handleCancelCreateFolder = useCallback(() => {
    setIsNewFolderModalOpen(false)
  }, [])

  return (
    <View style={styles.container}>
      <Button icon={<ReloadOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
      <Button icon={<FolderOutlined />} onClick={handleNewFolderButtonClick}>
        New Folder
      </Button>
      <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload File (up to 10MB)</Button>
      </Upload>

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onCreate={handleCreateFolder}
        onCancel={handleCancelCreateFolder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
})
