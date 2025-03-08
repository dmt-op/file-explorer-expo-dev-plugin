# File Explorer Expo Dev Plugin

A DevTools plugin for managing and viewing the file system in Expo Go and Expo development projects.

![Demo of file-explorer-expo-dev-plugin](./.github/assets/demo.gif)

## Installation

### Managed Expo Projects

Dev tools plugins [documentation](https://docs.expo.dev/debugging/devtools-plugins/)

### Bare React Native Projects

Ensure you have installed and configured the [`expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before proceeding.

Install the package with:

NPM

```sh
npm install file-explorer-expo-dev-plugin
```

Yarn

```sh
yarn add file-explorer-expo-dev-plugin
```

## Usage

```ts
import { useFileExplorerDevTools } from 'file-explorer-expo-dev-plugin'

export default App() {
  useFileExplorerDevTools();
  return (/* rest of your app */)
}
```

After installing the dev tools plugin and adding the connecting required code to your project, you can start the dev server up with `npx expo start`. Then press <kbd>shift</kbd> + <kbd>m</kbd> to open the list of available dev tools plugins. Select the plugin you want to use, and it will open in a new Chrome window.

Example project: [examples/example-file-system-tools](./examples/example-file-system-tools)

## Features

- Easily navigate and inspect the file system directly within Expo DevTools
- Perform file operations such as reading, writing, and deleting without extra setup
- Supports both Expo Go and Expo Dev Client for seamless integration
- Provides a lightweight and efficient way to test file storage during development

## Motivation

This plugin was created to provide a simple tool for quickly opening and manually testing files and folders created in Expo projects. The goal was to avoid the need for additional utility implementations or external tools, making file system interactions more convenient.

## API Documentation

- [Latest stable release](https://docs.expo.dev/versions/latest/sdk/file-system-dev-plugin/)
- [Main branch documentation](https://docs.expo.dev/versions/unversioned/sdk/file-system-dev-plugin/)

## Contributing

Contributions are welcome! Please follow the standard contribution process, including forking the repository, making changes in a feature branch, and submitting a pull request.

Extra: [Expo contributing guide](https://github.com/expo/expo#contributing)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
