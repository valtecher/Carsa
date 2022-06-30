'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('ReportOverview', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Car',
          key: 'id'
        }
      },
      technician_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Technician',
          key: 'person_id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ReportOverview');
  }
};
