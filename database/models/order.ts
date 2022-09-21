import { Model } from 'sequelize';
import { OrderType } from '../../types/order';

module.exports = (sequelize: any, DataTypes: any) => {
  class Order extends Model<OrderType> implements OrderType {
    id!: string;
    type!: string;
    status!: string;
    client_id!: string;
    selector_id!: string;
    date!: Date;
    sum!: number;

    static associate(models: any) {
      Order.belongsToMany(models.Car, {
        as: 'car_order',
        through: 'Car_Order',
        foreignKey: 'order_id'
      });

      Order.hasOne(models.Configuration, {
        foreignKey: 'order_id'
      });

      Order.hasMany(models.Payment, {
        foreignKey: 'order_id'
      });

      Order.belongsTo(models.Client, {
        foreignKey: 'client_id'
      });

      Order.belongsTo(models.CarSelector, {
        foreignKey: 'selector_id'
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Client',
          key: 'person_id'
        }
      },
      selector_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarSelector',
          key: 'person_id'
        }
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false
      },
      sum: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Order',
      freezeTableName: true,
      timestamps: true,
      createdAt: false,
      updatedAt: false
    }
  );

  return Order;
};
