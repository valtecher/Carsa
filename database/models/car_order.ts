const {Model} = require('sequelize')
import {Car_OrderType} from '../../types/car_order'

module.exports = (sequelize: any, DataTypes: any) => {
    class Car_Order extends Model<Car_OrderType> implements Car_OrderType {
        order_id!: string
        car_id!: string
        start_reservation!: Date
        status!: string

        static associate(models: any) {
           Car_Order.hasMany(models.Car, {foreignKey: 'id'})
        }
    }


    Car_Order.init({
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
            allowNull: false,
            type: DataTypes.DATE
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Car_Order'
    })

    return Car_Order
};