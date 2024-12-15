
module.exports = [
  {
    files: ["**/*.js", "**/*.jsx"], // Add .jsx files for JSX support
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"), // Add react plugin
      "jsx-a11y": require("eslint-plugin-jsx-a11y"), // Add JSX accessibility plugin
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
