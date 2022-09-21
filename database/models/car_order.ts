const { Model } = require('sequelize');
import { Car_OrderType, carOrderStatuses, CarOrderStatus, isCarOrderStatus } from '../../types/car_order';

module.exports = (sequelize: any, DataTypes: any) => {
  class Car_Order extends Model<Car_OrderType> implements Car_OrderType {
    order_id!: string;
    car_id!: string;
    start_reservation!: Date;
    status!: CarOrderStatus;
  }

  Car_Order.init(
    {
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Car',
          key: 'id'
        }
      },
      start_reservation: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false,
        comment: 'Timestamp when car reserved for this order only'
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!isCarOrderStatus(value)) {
              throw new Error(
                `Status should be one of the following: [${carOrderStatuses.map((v) => `'${v}'`).join(', ')}]`
              );
            }
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Car_Order',
      freezeTableName: true,
      timestamps: false
    }
  );

  return Car_Order;
};
