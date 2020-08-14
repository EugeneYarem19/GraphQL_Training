module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'],
        alias: {
          '@src': './src',
          "@components": "./src/components",
          "@api": "./src/apollo/api",
          "@types": "./src/types",
        },
      },
    ],
  ],
};
