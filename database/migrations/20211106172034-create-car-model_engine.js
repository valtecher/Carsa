'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('CarModel_Engine', {
      car_model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'CarModel',
          key: 'id'
        }
      },
      engine_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Engine',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CarModel_Engine');
  }
};
