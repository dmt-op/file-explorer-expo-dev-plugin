import { Button, Tooltip } from 'antd'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'

type ThemeToggleProps = {
  isDarkMode: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <Tooltip title={'Toggle theme'}>
      <Button
        type="text"
        icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
        onClick={onToggle}
        style={{ position: 'absolute', top: 12, right: 32 }}
      />
    </Tooltip>
  )
}
