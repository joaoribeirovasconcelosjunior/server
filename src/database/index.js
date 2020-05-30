const Sequelize = require('sequelize');
const dbConfig = require("../config/database");

const User = require("../models/User");
console.log(User);

const connection = new Sequelize(dbConfig);

connection.authenticate().then(function (){
  console.log("Sucess DataBase[connected]")})
  .catch(function(erro){
    console.log("DataBase[Error]"+erro)});


User.init(connection); // é passado o connection para o construtor

module.exports = connection;
