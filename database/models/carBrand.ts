const { Model } = require('sequelize');
import { CarBrandType } from '../../types/carBrand';

module.exports = (sequelize: any, DataTypes: any) => {
  class CarBrand extends Model<CarBrandType> implements CarBrandType {
    id!: string;
    name!: string;

    static associate(models: any) {
      CarBrand.hasMany(models.Car, {
        foreignKey: 'brand_id'
      });

      CarBrand.hasMany(models.CarModel, {
        foreignKey: 'brand_id'
      });

      CarBrand.hasMany(models.Configuration, {
        foreignKey: 'brand_id'
      });
    }
  }

  CarBrand.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'CarBrand',
      freezeTableName: true,
      timestamps: false
    }
  );

  return CarBrand;
};
