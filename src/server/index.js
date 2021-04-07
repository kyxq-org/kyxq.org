const fs = require("fs");
const { resolve, join } = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const config = require("../../config.json");
app.use(cors());
app.use("/", express.static(join(__dirname, "/dist")));
app.listen(config.port, () => {
  console.log("Server Online");
  if (process.env.NODE_ENV === "development" || process.argv.includes("--dev")) {
    require("./webpack");
  }
});

app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});
