const express = require('express');
const routes = express.Router();
//const bodyParser = require("body-parser");
const UserController = require("./controllers/UserController");
//const AddresesController = require("./controllers/AddresesController");

//const { createUserHandler,LoginUserHandler } = require("./controllers/AuthController");

//routes.post("/create-user", bodyParser.json(), createUserHandler);
//routes.post("/login-user", bodyParser.json(), LoginUserHandler);
routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
//routes.get("/list-all-users",bodyParser.json(), AddresesController.store);


//routes.get("users/:user_id/addresesses",bodyParser.json(), AddresesController.index);


module.exports = routes;
