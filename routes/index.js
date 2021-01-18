const express = require("express");
const Router = express.Router();

const User = require("./userRelated/user.route");
const Wishlist = require("./wishlistRouter");
const Review = require("./reviewRouter");

Router.use("/user", User);
Router.use("/review", Review);
Router.use("/wishlist", Wishlist);

module.exports = Router;