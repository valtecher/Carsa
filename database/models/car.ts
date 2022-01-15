const {Model} = require('sequelize')
import {CarType} from '../../types/car'

module.exports = (sequelize: any, DataTypes: any) => {
    class Car extends Model<CarType> implements CarType {
        id!: string
        color!: string
        vin?: string
        registrationNumber?: string
        description?: string
        mileage!: string
        year!: number
        drive!: string
        transmission!: string
        market_name!: string
        marketplace_link!: string
        price!: string
        type!: string
        generation_id!: string
        engine_id!: string
        location_id!: string
        mainImage?: string
        images?: Array<String>

        static associate(models: any) {
            Car.belongsToMany(models.Order, {
                as: 'car_orders',
                through: 'Car_Order',
                foreignKey: 'car_id'
            })
            Car.belongsTo(models.Engine, {
                foreignKey: 'engine_id'
            })
            Car.belongsTo(models.CarBrand, {
                foreignKey: 'brand_id'
            })
            Car.belongsTo(models.CarModel, {
                foreignKey: 'model_id'
            })
            Car.belongsTo(models.CarGeneration, {
                foreignKey: 'generation_id'
            })
            Car.belongsTo(models.Location, {
                foreignKey: 'location_id'
            })
            Car.hasMany(models.ReportOverview, {
                foreignKey: 'car_id'
            })
            Car.belongsToMany(models.Equipment, {
                as: 'car_equipment',
                through: 'Car_Equipment',
                foreignKey: 'car_id'
            })
        }
    }

    Car.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        color: {
            allowNull: false,
            type: DataTypes.STRING
        },
        vin: {
            allowNull: true,
            type: DataTypes.STRING
        },
        registrationNumber: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        mileage: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        year: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        drive: {
            allowNull: false,
            type: DataTypes.STRING
        },
        transmission: {
            allowNull: false,
            type: DataTypes.STRING
        },
        market_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        marketplace_link: {
            allowNull: true,
            type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        brand_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'CarBrand',
                key: 'id'
            }
        },
        model_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'CarModel',
                key: 'id'
            }
        },
        generation_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'CarGeneration',
                key: 'id'
            }
        },
        engine_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Engine',
                key: 'id'
            }
        },
        location_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Location',
                key: 'id'
            }
        },
        mainImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Car'
    })

    return Car
}