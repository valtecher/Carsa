'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('CarGeneration', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: 'compositeIndex'
      },
      start_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value < new Date().getFullYear() - 100) {
              throw new Error('The start date must be no earlier than 100 years ago');
            }
          }
        }
      },
      end_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value && value < CarGeneration.start_year) {
              throw new Error('End date must be grater than start date');
            }
          }
        }
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: 'compositeIndex',
        references: {
          model: 'CarModel',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CarGeneration');
  }
};
