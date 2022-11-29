const { Model } = require('sequelize');
import db from './';
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

    getSpecs = async () => {
      const brand = await db.CarBrand.findByPk(this.get('brand_id'), { raw: true });
      const model = await db.CarModel.findByPk(this.get('model_id'), { raw: true });
      const generation = await db.CarGeneration.findByPk(this.get('generation_id'), { raw: true });
      const location = await db.Location.findByPk(this.get('location_id'), { raw: true });

      return {
        id: this.get('id'),
        brand: brand?.name || null,
        model: model?.name || null,
        generation: generation?.name || null,
        year: `${this.get('year_from') ?? ''}-${this.get('year_until') ?? ''}`,
        engine_volume: `${this.get('engine_volume_from') ?? ''}-${this.get('engine_volume_until') ?? ''}`,
        price: `${this.get('price_from') ?? ''}-${this.get('price_until') ?? ''}`,
        type: this.get('type'),
        transmission: this.get('transmission'),
        mileage: `${this.get('mileage_from') ?? ''}-${this.get('mileage_until') ?? ''}`,
        location: location
      };
    };

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
        type: DataTypes.DECIMAL(4),
        allowNull: true,
        validate: {
          min: 0
        }
      },
      engine_volume_until: {
        type: DataTypes.DECIMAL(4),
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
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      price_until: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0
        }
      },
      mileage_until: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          customValidator(value) {
            if (value && value < Configuration.mileage_from) {
              throw new Error('The upper bound of mileage must be bigger than lower');
            }
          }
        }
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
      paranoid: true,
      modelName: 'Configuration',
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false
    }
  );

  return Configuration;
};
