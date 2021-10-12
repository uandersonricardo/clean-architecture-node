module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@adapters": "./src/adapters",
          "@core": "./src/core",
          "@infra": "./src/infra",
          "@presentation": "./src/presentation",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
