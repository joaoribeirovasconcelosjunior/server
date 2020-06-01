const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(() => {
  console.log('Sucess DataBase[connected]');
})
  .catch((err) => {
    console.log(`DataBase[Error]'${err}`);
  });

User.init(connection); // é passado o connection para o construtor


module.exports = connection;
