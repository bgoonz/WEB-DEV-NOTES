//@ts-check

"use strict";

const path = require("path");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  target: "node", // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  entry: "./src/extension.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, "dist"),
    filename: "extension.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new FilterWarningsPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    }),
    new FilterWarningsPlugin({
      exclude: /Module not found: Error: Can't resolve/,
    }),
    new FilterWarningsPlugin({
      exclude: /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
    }),
    new CleanWebpackPlugin(),
  ],
};
module.exports = config;
