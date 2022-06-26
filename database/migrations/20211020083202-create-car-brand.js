'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('CarBrand', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CarBrand');
  }
};
