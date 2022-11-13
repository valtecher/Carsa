const { Model } = require('sequelize');
import { CarType } from '../../types/car';

module.exports = (sequelize: any, DataTypes: any) => {
  class Car extends Model<CarType> implements CarType {
    id!: string;
    color!: string;
    vin?: string;
    registrationNumber?: string;
    description?: string;
    mileage!: number;
    year!: number;
    drive!: string;
    transmission!: string;
    market_name?: string;
    marketplace_link?: string;
    price!: string;
    type!: string;
    brand_id!: string;
    model_id!: string;
    generation_id?: string;
    engine_id!: string;
    location_id!: string;
    mainImage?: string;
    images?: Array<string>;

    static associate(models: any) {
      Car.belongsTo(models.CarBrand, {
        foreignKey: 'brand_id'
      });

      Car.belongsTo(models.CarModel, {
        foreignKey: 'model_id'
      });

      Car.belongsTo(models.CarGeneration, {
        foreignKey: 'generation_id'
      });

      Car.belongsTo(models.Engine, {
        foreignKey: 'engine_id'
      });

      Car.belongsTo(models.Location, {
        foreignKey: 'location_id'
      });

      Car.belongsToMany(models.Order, {
        as: 'car_order',
        through: 'Car_Order',
        foreignKey: 'car_id'
      });

      Car.hasMany(models.ReportOverview, {
        foreignKey: 'car_id'
      });

      Car.belongsToMany(models.Equipment, {
        as: 'car_equipment',
        through: 'Car_Equipment',
        foreignKey: 'car_id'
      });
    }
  }

  Car.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      vin: {
        type: DataTypes.STRING(17),
        allowNull: true,
      },
      registrationNumber: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      drive: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      transmission: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      market_name: {
        type: DataTypes.STRING(60),
        allowNull: true
      },
      marketplace_link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Provided link is not a valid URL address'
          }
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CarBrand',
          key: 'id'
        }
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      engine_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Engine',
          key: 'id'
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
      mainImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Car',
      freezeTableName: true,
      timestamps: true
    }
  );

  return Car;
};
