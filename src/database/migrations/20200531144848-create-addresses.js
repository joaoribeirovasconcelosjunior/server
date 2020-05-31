/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */
/* IGNORAR NÂO ESTE CODÍGO NÂO ESTÁ SENDO USADO */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

        /* o references referece a tabela users e pega o ID  usando a ideia de um para muitos
         * criando uma chave estrangeira
        * */
      },
      ranking: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kd: {
        type: Sequelize.STRING,
        allowNull: true,
      },


    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('addresses');
  }
};
