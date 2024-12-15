module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Expo preset
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src/"],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      
    ],
  };
};
