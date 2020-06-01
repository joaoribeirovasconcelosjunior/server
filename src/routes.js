const express = require('express');
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);

routes.get('/users', UserController.index);
routes.use(authMiddleware);

routes.get('/', (req, res) => {
  res.send({ id: req.userID });
});


module.exports = routes;
