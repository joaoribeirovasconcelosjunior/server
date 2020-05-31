const { Model, DataTypes } = require('sequelize');

class Addreses extends Model {

  static init(sequelize){
    super.init({
      ranking: DataTypes.STRING,
      kd: DataTypes.STRING,
    },{
      sequelize,tableName: 'addreses'
    })

}
}

module.exports = Addreses;
