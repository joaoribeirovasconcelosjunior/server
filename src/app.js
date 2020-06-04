const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');


require('./database/index');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extend: false })); // apenas dados simples
app.use(bodyParser.json()); // usa apenas json
app.use(routes);

app.use((req, res, next) => {
  const erro = new Error('route not found');
  erro.status = 404;
  next(erro);
});

/* BUG + Misterio no 'next(error)'  ESLINT parar de apontar que 'never used' */

app.use((error, req, res, next) => {
  next(error);
  res.status(error.status || 500);
  return res.send({
    erro: {
      msg: error.message,
    },
  });
});

module.exports = app;
