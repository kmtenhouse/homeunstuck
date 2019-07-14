"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan");

module.exports = function() {
  let server = express(),
    create,
    start;

  create = function(config) {
    let routes = require("./routes");

    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.set("staticDir", config.staticDir);

    // Returns middleware that parses json
    server.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    server.use(bodyParser.json());

    //Logging (for dev)
    server.use(morgan("dev"));

    // Set up a static directory for images
    server.use(express.static(server.get("staticDir")));

    //Set up headers
    server.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    // Set up routes
    // ====== Routing ======
    server.use(routes);
  };

  start = function() {
    let hostname = server.get("hostname"),
      port = server.get("port");

    server.listen(port, function() {
      console.log(`App listening on http://${hostname}:${port}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
