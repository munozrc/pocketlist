// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  extends: [
    "expo",
    "plugin:react/recommended",
    "plugin:react-native-a11y/ios",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
