'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Location', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: 'compositeIndex'
      },
      state: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: 'compositeIndex'
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: 'compositeIndex'
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: 'compositeIndex'
      },
      street: {
        type: DataTypes.STRING(140),
        allowNull: true,
        unique: 'compositeIndex'
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Location');
  }
};
