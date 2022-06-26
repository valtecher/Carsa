const { Model } = require('sequelize');
import { CarModelType } from '../../types/carModel';

module.exports = (sequelize: any, DataTypes: any) => {
  class CarModel extends Model<CarModelType> implements CarModelType {
    id!: string;
    name!: string;
    brand_id!: string;

    static associate(models: any) {
      CarModel.belongsToMany(models.Engine, {
        as: 'carModel_engine',
        through: 'CarModel_Engine',
        foreignKey: 'car_model_id'
      });

      CarModel.hasMany(models.Configuration, {
        foreignKey: 'model_id'
      });

      CarModel.belongsTo(models.CarBrand, {
        foreignKey: 'brand_id'
      });

      CarModel.hasMany(models.CarGeneration, {
        foreignKey: 'model_id'
      });

      CarModel.hasMany(models.Car, {
        foreignKey: 'model_id'
      });
    }
  }

  CarModel.init(
    {
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
      brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'CarBrand',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'CarModel',
      freezeTableName: true,
      timestamps: false
    }
  );

  return CarModel;
};
