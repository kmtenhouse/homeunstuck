"use strict";

const router = require("express").Router();

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.json({message: true});
});

module.exports = router;
