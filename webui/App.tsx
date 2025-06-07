import { ConfigProvider, message, Layout, theme } from 'antd'
import { useState } from 'react'

import { Explorer } from '@/Explorer'
import '@ant-design/v5-patch-for-react-19'
import { View } from 'react-native'
import { ThemeToggle } from '@/components/ThemeToggle'

const THEME_STORAGE_KEY = 'expo-fs-explorer-is-dark-mode'

message.config({
  top: 8,
  duration: 1,
  maxCount: 3,
})

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem(THEME_STORAGE_KEY) === 'true'
  )

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(THEME_STORAGE_KEY, String(!isDarkMode))
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
