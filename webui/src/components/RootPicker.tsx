import { Button, Row } from 'antd'

import { RootDirectory } from '../types'

import { capitalize } from '@/utils'

type RootPickerProps = {
  onRootChange: (root: RootDirectory) => void
  selectedRoot: RootDirectory
}

export function RootPicker({ onRootChange, selectedRoot }: RootPickerProps) {
  return (
    <Row style={{ gap: 8 }}>
      {Object.values(RootDirectory).map((root) => (
        <Button
          key={root}
          onClick={() => onRootChange(root)}
          type={root === selectedRoot ? 'primary' : 'default'}
          style={{
            borderRadius: 15,
          }}
        >
          {capitalize(root)}
        </Button>
      ))}
    </Row>
  )
}
