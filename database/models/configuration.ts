const { Model } = require('sequelize');
import ConfigurationType from '../../types/configuration';

module.exports = (sequelize: any, DataTypes: any) => {
  class Configuration extends Model<ConfigurationType> implements ConfigurationType {
    id!: string;
    order_id!: string;
    brand_id?: string;
    model_id?: string;
    generation_id?: string;
    year_from?: number;
    year_until?: number;
    engine_volume_from?: number;
    engine_volume_until?: number;
    price_from?: number;
    price_until?: number;
    type?: string;
    transmission?: string;
    mileage_from?: number;
    mileage_until?: number;
    location_id?: string;

    static associate(models: any) {
      Configuration.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });

      Configuration.belongsTo(models.Location, {
        foreignKey: 'location_id'
      });

      Configuration.belongsTo(models.CarBrand, {
        foreignKey: 'brand_id'
      });

      Configuration.belongsTo(models.CarModel, {
        foreignKey: 'model_id'
      });

      Configuration.belongsTo(models.CarGeneration, {
        foreignKey: 'generation_id'
      });
    }
  }

  Configuration.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Configuration',
      freezeTableName: true,
      timestamps: false
    }
  );

  return Configuration;
};
