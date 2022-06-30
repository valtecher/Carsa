'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Engine', {
      d: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      volume: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0.5,
          max: 10
        }
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 20
        }
      },
      fuel_type: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Engine');
  }
};
