
/* NÃO UTILIZADO PODE DESCONSIDERAR*/
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */


const dbconnection = require("./config/database");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconnection);


sequelize.authenticate().then(function (){
  console.log("DataBase[connected]")})
  .catch(function(erro){
    console.log("DataBase[Error]"+erro)});

