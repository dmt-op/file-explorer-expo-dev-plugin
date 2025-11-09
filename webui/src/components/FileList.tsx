import {
  DeleteOutlined,
  FolderOutlined,
  FileOutlined,
  DownloadOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Table, Divider, Tooltip, theme, Popconfirm } from 'antd'
import { FileInfo } from 'expo-file-system/legacy'
import { View, StyleSheet } from 'react-native'

import { AppFile } from '@/types'
import { bytesToSize, formatTimestamp } from '@/utils'

type FileListProps = {
  sortedFiles: AppFile[]
  handleItemPress: (file: AppFile) => void
  handleItemDelete: (file: AppFile) => void
  handleItemDownload: (file: AppFile) => void
}

export function FileList({
  sortedFiles,
  handleItemPress,
  handleItemDelete,
  handleItemDownload,
}: FileListProps) {
  const { token } = theme.useToken()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: AppFile, b: AppFile) => a.name.localeCompare(b.name),
      render: (text: string, file: AppFile) => (
        <a
          style={{
            color: file.info.isDirectory ? token.colorPrimary : token.colorText,
          }}
          onClick={() => handleItemPress(file)}
        >
          {file.info.isDirectory ? (
            <FolderOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />
          ) : (
            <FileOutlined style={{ marginRight: 8 }} />
          )}
          {text}
        </a>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'info',
      key: 'size',
      render: (info: FileInfo) => (info.exists ? bytesToSize(info.size) : '-'),
      sorter: (a: AppFile, b: AppFile) =>
        a.info.exists && b.info.exists ? a.info.size - b.info.size : 0,
    },
    {
      title: 'Modified',
      dataIndex: 'info',
      key: 'modified',
      render: (info: FileInfo) =>
        info.exists && info.modificationTime
          ? formatTimestamp(info.modificationTime)
          : 'N/A',
      sorter: (a: AppFile, b: AppFile) =>
        a.info.exists && b.info.exists
          ? a.info.modificationTime - b.info.modificationTime
          : 0,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, file: AppFile) => (
        <View style={styles.actions}>
          {!file.info.isDirectory && (
            <Tooltip title="Download">
              <DownloadOutlined
                style={{ color: token.colorPrimary, cursor: 'pointer' }}
                onClick={() => handleItemDownload(file)}
              />
            </Tooltip>
          )}

          <Divider type="vertical" />

          <Popconfirm
            title="Full path"
            description={file.info.uri}
            showCancel={false}
            icon={null}
          >
            <Tooltip title="View full path">
              <EyeOutlined
                style={{ color: token.colorPrimary, cursor: 'pointer' }}
              />
            </Tooltip>
          </Popconfirm>

          <Divider type="vertical" />

          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ color: token.colorError, cursor: 'pointer' }}
              onClick={() => handleItemDelete(file)}
            />
          </Tooltip>
        </View>
      ),
    },
  ]

  return (
    <Table
      style={{ width: '100%', flex: 1 }}
      columns={columns}
      dataSource={sortedFiles}
      pagination={false}
      scroll={{ y: 'calc(100vh - 372px)' }}
      rowKey="name"
    />
  )
}

const styles = StyleSheet.create({
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
})
