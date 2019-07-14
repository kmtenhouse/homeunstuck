"use strict";

const env = process.env.NODE_ENV || "local",
  envConfig = require("./" + env);

let defaultConfig = {
  env: env
};

module.exports = Object.assign({}, defaultConfig, envConfig);
