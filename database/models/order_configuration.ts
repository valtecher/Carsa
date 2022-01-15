const {Model} = require('sequelize')
import {Order_ConfigurationType} from '../../types/order_configuration'

module.exports = (sequelize: any, DataTypes: any) => {
    class Order_Configuration extends Model<Order_ConfigurationType> implements Order_ConfigurationType {
        order_id!: string
        configuration_id!: string
    }

    Order_Configuration.init({
        order_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Order',
                key: 'id'
            }
        },
        configuration_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Configuration',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Order_Configuration'
    })

    return Order_Configuration
};