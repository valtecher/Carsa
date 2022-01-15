import {Model} from 'sequelize'
import {PaymentType} from '../../types/payment'

const Order = require('./order')

module.exports = (sequelize: any, DataTypes: any) => {
    class Payment extends Model<PaymentType> implements PaymentType {
        id!: string
        date!: Date
        amount!: number
        sum!: number
        order_id!: string

        static associate(models: any) {
            Payment.hasOne(models.CardPayment, {
                foreignKey: 'payment_id'
            });
            Payment.hasOne(models.CashPayment, {
                foreignKey: 'payment_id'
            });
            Payment.belongsTo(models.Order, { 
                foreignKey: 'order_id',
            })
            
        }
    }

    Payment.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        amount: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        sum: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Order',
                key: 'id'
            }
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Payment'
    })

    return Payment
};