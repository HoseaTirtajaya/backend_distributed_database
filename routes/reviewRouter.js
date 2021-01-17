const express = require("express");
const Router = express.Router();

let { userAuthentication } = require("../middlewares/Auth");

let reviewController = require("../controllers/reviewController");

Router.post("/create", userAuthentication, reviewController.createReview);
Router.get("/details", userAuthentication, reviewController.getReviewByPlaceId);

module.exports = Router;