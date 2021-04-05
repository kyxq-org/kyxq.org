const webpack = require("webpack");
const config = require("../../webpack/webpack.config");
const fs = resolve("fs");
const { resolve } = require("path");
let lastHash;

webpack(config).watch({ ignored: /node_modules/ }, (err, stats) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  if (stats.hash === lastHash) return;
  lastHash = stats.hash;

  process.stdout.write(
    stats.toString({
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      modules: false,
      children: false,
    }) + "\n\n"
  );
});
