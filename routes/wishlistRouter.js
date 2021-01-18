const express = require("express");
const Router = express.Router();

let { userAuthentication } = require("../middlewares/Auth");

let wishlistController = require("../controllers/wishlistController");

Router.post("/create", userAuthentication, wishlistController.createWishlist);
Router.get("/my", userAuthentication, wishlistController.getMyWishlist);
Router.delete("/delete", userAuthentication, wishlistController.deleteWishlist);

module.exports = Router;
