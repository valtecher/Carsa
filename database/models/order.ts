import {Model} from 'sequelize'
import {OrderType} from '../../types/order'

module.exports = (sequelize: any, DataTypes: any) => {
    class Order extends Model<OrderType> implements OrderType {
        id!: string;
        status!: string;
        client_id!: string;
        manager_id!: string;
        date!: Date;
        sum!: number;

        static associate(models: any) {
            Order.belongsToMany(models.Car, {
                as: 'cars',
                through: 'Car_Order',
                foreignKey: 'order_id'
            })
            Order.belongsToMany(models.Configuration, {
                as: 'order_configuration',
                through: 'Order_Configuration',
                foreignKey: 'order_id'
            })
            Order.hasMany(models.Payment, {
                foreignKey: 'order_id'
            })
            Order.belongsTo(models.Client, {
                foreignKey: 'client_id'
            })
            Order.belongsTo(models.Manager, {
                foreignKey: 'manager_id'
            })
        }
    }

    Order.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        status: {
            allowNull: false,
            type: DataTypes.STRING
        },
        client_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Client',
                key: 'person_id'
            }
        },
        manager_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Manager',
                key: 'person_id'
            }
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        sum: {
            allowNull: false,
            type: DataTypes.DOUBLE
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Order'
    })

    return Order
};