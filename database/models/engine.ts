const { Model } = require('sequelize');
import { EngineType } from '../../types/engine';

module.exports = (sequelize: any, DataTypes: any) => {
  class Engine extends Model<EngineType> implements EngineType {
    id!: string;
    name!: string;
    volume?: number;
    power!: number;
    fuel_type!: string;

    static associate(models: any) {
      Engine.hasMany(models.Car, {
        foreignKey: 'engine_id'
      });

      Engine.belongsToMany(models.CarModel, {
        as: 'carModel_engine',
        through: 'CarModel_Engine',
        foreignKey: 'engine_id'
      });
    }
  }

  Engine.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(80),
        allowNull: false
      },
      volume: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0.5,
          max: 10000
        }
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 20
        }
      },
      fuel_type: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Engine',
      freezeTableName: true,
      timestamps: false
    }
  );

  return Engine;
};
