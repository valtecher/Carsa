const {Model} = require('sequelize')
import {CardPaymentType} from '../../types/cardPayment'

module.exports = (sequelize: any, DataTypes: any) => {
    class CardPayment extends Model<CardPaymentType> implements CardPaymentType {
        payment_id!: string;
        card_number!: string;
        ownerName!: string;  

        static associate(models: any) {
            CardPayment.belongsTo(models.Payment, {
                foreignKey: 'payment_id'
            })
        }
    }

    CardPayment.init({
        payment_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Payment',
                key: 'id'
            }
        }, 
        card_number: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        owner_name: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CardPayment'
    })

    return CardPayment
};