'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Car_Equipment', {
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Car',
          key: 'id'
        }
      },
      equipment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Equipment',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Car_Equipment');
  }
};
