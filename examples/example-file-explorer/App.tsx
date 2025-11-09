import { Button, Text, View, StyleSheet, Alert } from 'react-native'
import * as FileSystem from 'expo-file-system/legacy'
import { useCallback } from 'react'
import { useFileExplorerDevTools } from 'file-explorer-expo-dev-plugin'

export default function App() {
  useFileExplorerDevTools()

  const createRandomFiles = useCallback(async () => {
    try {
      const rootFolder = `${
        FileSystem.documentDirectory
      }/folder${Math.random()}`
      const nestedFolders = `${FileSystem.documentDirectory}/folder1/folder2/folder 3`
      await FileSystem.makeDirectoryAsync(rootFolder, { intermediates: true })
      await FileSystem.makeDirectoryAsync(nestedFolders, {
        intermediates: true,
      })

      const rootFile = `${rootFolder}/${Date.now()}.txt`
      const nestedFile = `${nestedFolders}/${Date.now() + 1}.txt`

      await FileSystem.writeAsStringAsync(rootFile, 'Hello, world!')
      await FileSystem.writeAsStringAsync(nestedFile, 'Hello, world!')
    } catch (error) {
      console.error(error)
    }
  }, [])

  const clearDocumentDirectory = useCallback(async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory!
      )
      for (const file of files) {
        await FileSystem.deleteAsync(`${FileSystem.documentDirectory!}/${file}`)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>File System Tools</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Create Random Files" onPress={createRandomFiles} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Clear Document Directory"
            onPress={clearDocumentDirectory}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonWrapper: {
    marginVertical: 8,
    width: '100%',
  },
})
