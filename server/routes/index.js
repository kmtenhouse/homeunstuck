"use strict";

const router = require("express").Router();

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.json({message: true});
});

router.get("*", (req, res) => {
  res.redirect("/404.html");
});

module.exports = router;
