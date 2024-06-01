const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");

// .envファイルの内容を読み込む
const env = dotenv.config().parsed || {};

// 環境変数をDefinePluginの形式に変換
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  // 他の設定
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
};
