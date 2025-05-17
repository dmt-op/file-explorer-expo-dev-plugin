import { ConfigProvider, message, Layout, theme } from 'antd'
import { useState } from 'react'

import { Explorer } from '@/Explorer'
import '@ant-design/v5-patch-for-react-19'
import { View } from 'react-native'
import { ThemeToggle } from '@/components/ThemeToggle'

const { Content } = Layout

message.config({
  top: 8,
  duration: 1,
  maxCount: 3,
})

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Layout
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'relative',
            }}
          >
            <Explorer />
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </View>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
