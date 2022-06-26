const { Model } = require('sequelize');
import { LocationType } from '../../types/location';

module.exports = (sequelize: any, DataTypes: any) => {
  class Location extends Model<LocationType> implements LocationType {
    id!: string;
    country!: string;
    state!: string;
    city?: string;
    postal_code?: string;
    street?: string;

    static associate(models: any) {
      Location.hasMany(models.Configuration, {
        foreignKey: 'location_id'
      });

      Location.hasMany(models.Technician, {
        foreignKey: 'location_id'
      });

      Location.hasMany(models.Car, {
        foreignKey: 'location_id'
      });
    }
  }

  Location.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: 'compositeIndex'
      },
      state: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: 'compositeIndex'
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: 'compositeIndex'
      },
      postal_code: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: 'compositeIndex'
      },
      street: {
        type: DataTypes.STRING(140),
        allowNull: true,
        unique: 'compositeIndex'
      }
    },
    {
      sequelize,
      modelName: 'Location',
      freezeTableName: true,
      timestamps: false
    }
  );

  return Location;
};
