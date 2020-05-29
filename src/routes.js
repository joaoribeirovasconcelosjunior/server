const express = require('express');
const routes = express.Router();
const bodyParser = require("body-parser");

const { createUserHandler,LoginUserHandler } = require("./controllers/AuthController");

routes.post("/create-user", bodyParser.json(), createUserHandler);
routes.post("/login-user", bodyParser.json(), LoginUserHandler);


module.exports = routes;
