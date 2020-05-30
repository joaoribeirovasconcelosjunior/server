const express = require('express');
const routes = express.Router();
const bodyParser = require("body-parser");
const UserController = require("./controllers/UserController");

const { createUserHandler,LoginUserHandler } = require("./controllers/AuthController");

routes.post("/create-user", bodyParser.json(), createUserHandler);
routes.post("/login-user", bodyParser.json(), LoginUserHandler);
routes.post("/users", UserController.store);


module.exports = routes;
