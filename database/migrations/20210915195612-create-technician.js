'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Technician', {
      person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Employee',
          key: 'person_id'
        }
      },
      location_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Location',
          key: 'id'
        }
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Technician');
  }
};
