'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Equipment', {
      iid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Equipment');
  }
};
