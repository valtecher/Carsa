'use strict';

const { DataTypes } = require('sequelize/dist');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Client', {
      person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Person',
          key: 'id'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is not valid'
          }
        }
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Client');
  }
};
