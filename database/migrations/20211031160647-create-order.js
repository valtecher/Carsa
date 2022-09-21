'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Order', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Client',
          key: 'person_id'
        }
      },
      selector_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarSelector',
          key: 'person_id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      sum: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Order');
  }
};
