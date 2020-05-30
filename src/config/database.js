/*module.exports = {
  dialect: 'mysql',
  host: "localhost",
  username: "root",
  database: "sequelizedb",
  password: "6d6i3",
  define: {
    timestamps: true,
  },
};*/

module.exports = {

  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
  host: "localhost",
  username: "postgres",
  database: "joaor",
  password: "docker",
  port: 5432,
  define: {
    timestamps: true,
    underscored: true,

  },
};

