import { Model } from 'sequelize';
import { PaymentType } from '../../types/payment';

module.exports = (sequelize: any, DataTypes: any) => {
  class Payment extends Model<PaymentType> implements PaymentType {
    id!: string;
    amount!: number;
    order_id!: string;

    static associate(models: any) {
      Payment.belongsTo(models.Order, {
        foreignKey: 'order_id'
      });
    }
  }

  Payment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0.01
        }
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Payment',
      freezeTableName: true,
      createdAt: 'date',
      updatedAt: false
    }
  );

  return Payment;
};
