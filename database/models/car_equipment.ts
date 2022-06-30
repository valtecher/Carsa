const { Model } = require('sequelize');
import { Car_EquipmentType } from '../../types/car_equipment';

module.exports = (sequelize: any, DataTypes: any) => {
  class Car_Equipment extends Model<Car_EquipmentType> implements Car_EquipmentType {
    car_id!: string;
    equipment_id!: string;
  }

  Car_Equipment.init(
    {
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Car',
          key: 'id'
        }
      },
      equipment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Equipment',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Car_Equipment',
      freezeTableName: true,
      timestamps: false
    }
  );

  return Car_Equipment;
};
