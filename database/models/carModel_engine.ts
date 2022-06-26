const { Model } = require('sequelize');
import { CarModel_EngineType } from '../../types/carModel_engine';

module.exports = (sequelize: any, DataTypes: any) => {
  class CarModel_Engine extends Model<CarModel_EngineType> implements CarModel_EngineType {
    car_model_id!: string;
    engine_id!: string;
  }

  CarModel_Engine.init(
    {
      car_model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'CarModel',
          key: 'id'
        }
      },
      engine_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Engine',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'CarModel_Engine',
      freezeTableName: true,
      timestamps: false
    }
  );

  return CarModel_Engine;
};
