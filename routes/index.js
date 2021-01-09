const express = require("express");
const Router = express.Router();

const User = require("./userRelated/user.route");

Router.use("/user", User);

module.exports = Router;