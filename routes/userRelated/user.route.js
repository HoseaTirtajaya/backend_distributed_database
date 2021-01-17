const express = require("express");
const Router = express.Router();

//Controllers
const userController = require("../../controllers/userController");

//Middlewares
const { userAuthentication } = require("../../middlewares/Auth");
const {sendEmailRegister} = require("../../middlewares/sendEmailRegister");


Router.get("/auth/:token", userController.updateVerification);
Router.get("/checkauth", userAuthentication, userController.checkAuthentication);
Router.post("/register", userController.createUser, sendEmailRegister);
Router.post("/login", userController.loginUser)



module.exports = Router;