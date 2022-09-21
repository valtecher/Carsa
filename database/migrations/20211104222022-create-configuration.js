'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Configuration', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      brand_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarBrand',
          key: 'id'
        }
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarModel',
          key: 'id'
        }
      },
      generation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarGeneration',
          key: 'id'
        }
      },
      year_from: {
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
      year_until: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value && value < Configuration.year_from) {
              throw new Error('End date must be grater than start date');
            }
          }
        }
      },
      engine_volume_from: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      engine_volume_until: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value && value < Configuration.engine_volume_until) {
              throw new Error('The upper bound of engine volume must be bigger than lower');
            }
          }
        }
      },
      price_from: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      price_until: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value && value < Configuration.price_from) {
              throw new Error('The upper bound of price must be bigger than lower');
            }
          }
        }
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      transmission: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      mileage_from: {
        type: DataTypes.INTEGER
      },
      mileage_until: {
        type: DataTypes.INTEGER
      },
      location_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Location',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Configuration');
  }
};
