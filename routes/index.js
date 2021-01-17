const express = require("express");
const Router = express.Router();

const User = require("./userRelated/user.route");
const Review = require("./reviewRouter");

Router.use("/user", User);
Router.use("/review", Review);

module.exports = Router;