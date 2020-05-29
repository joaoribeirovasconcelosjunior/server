const express =  require("express");
const app = express();
const routes = require("./routes");

app.use(routes);
app.use((req,res, next) => {
  const erro = new Error("route not found");
  erro.status = 404;
  next(erro);
});

/*BUG + Misterio no "next(error)" coloquei apenas para o ESLINT parar de apontar que "never used"
  * Porque simplesmente retirar o next ?, acontece que quando faz isso retorna muito LIXO além do error.
  *
  * */

app.use((error, req, res,next ) => {
  next(error);
  res.status(error.status || 500);
  return res.send({
    erro: {
      msg: error.message
    }
  });
});


module.exports = app;

