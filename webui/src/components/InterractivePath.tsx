import { Breadcrumb, Button, message, Tooltip } from 'antd'
import { useCallback, useMemo } from 'react'
import { CopyOutlined } from '@ant-design/icons'
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

  const handleCopyPath = useCallback(() => {
    navigator.clipboard.writeText(path)
    message.success('Path copied to clipboard')
  }, [path])

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
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Breadcrumb
        style={{ width: '100%' }}
        separator=">"
        items={breadcrumbItems}
      />
      <Tooltip title="Copy Full Path">
        <Button type="text" icon={<CopyOutlined />} onClick={handleCopyPath}>
          Copy Path
        </Button>
      </Tooltip>
    </div>
  )
}
