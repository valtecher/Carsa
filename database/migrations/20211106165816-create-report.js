'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Report', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      condition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      overview_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'ReportOverview',
          key: 'id'
        }
      },
      type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'ReportType',
          key: 'id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Report');
  }
};
