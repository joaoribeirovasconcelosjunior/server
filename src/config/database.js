module.exports = {

  dialect: 'postgres',
  dialectOptions: {
    ssl: false,
  },
  host: "localhost",
  username: "postgres",
  database: "joaor",
  password: "docker",
  define: {
    timestamps: true,
    uderscored: true,

  },
};

