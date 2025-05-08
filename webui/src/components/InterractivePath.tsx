import { Breadcrumb } from 'antd'
import { useMemo } from 'react'

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
    <Breadcrumb
      style={{ width: '100%' }}
      separator=">"
      items={breadcrumbItems}
    />
  )
}
