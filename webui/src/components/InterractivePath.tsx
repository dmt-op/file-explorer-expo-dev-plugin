import { Breadcrumb, Button, Divider, message, Tooltip, Typography } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { getRelativeExpoFsPathParts } from '@/utils'

type InterractivePathProps = {
  root: string
  path: string
  onPathChange: (path: string) => void
}

export function InterractivePath({
  root,
  path,
  onPathChange,
}: InterractivePathProps) {
  const parts = useMemo(
    () => getRelativeExpoFsPathParts(path, root),
    [path, root]
  )
  const [showFullPath, setShowFullPath] = useState(false)

  const handleViewFullPath = useCallback(() => {
    setShowFullPath((prev) => !prev)
  }, [])

  const breadcrumbItems = [
    {
      title: <a onClick={() => onPathChange(root)}>Root</a>,
    },
    ...parts.map((part, index) => {
      const isLast = index === parts.length - 1
      return {
        title: isLast ? (
          <span>{part}</span>
        ) : (
          <a
            onClick={() =>
              onPathChange(root + parts.slice(0, index + 1).join('/'))
            }
          >
            {part}
          </a>
        ),
      }
    }),
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          gap: 4,
        }}
      >
        <Breadcrumb
          style={{ width: '100%' }}
          separator=">"
          items={breadcrumbItems}
        />
        <Tooltip title="View raw path">
          <Button
            type="text"
            icon={showFullPath ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={handleViewFullPath}
          >
            {showFullPath ? 'Hide raw path' : 'Show raw path'}
          </Button>
        </Tooltip>
      </div>

      {showFullPath && (
        <>
          <Divider />
          <Typography.Text type="secondary">{path}</Typography.Text>
        </>
      )}
    </div>
  )
}
