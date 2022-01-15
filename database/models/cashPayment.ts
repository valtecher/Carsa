const {Model} = require('sequelize')
import {CashPaymentType} from '../../types/cashPayment'

module.exports = (sequelize: any, DataTypes: any) => {
    class CashPayment extends Model<CashPaymentType> implements CashPaymentType {
        payment_id!: string;

        static associate(models: any) {
            CashPayment.belongsTo(models.Payment, {
                foreignKey: 'payment_id'
            })
        }
    }

    CashPayment.init({
        payment_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Payment',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CashPayment'
    })

    return CashPayment
};