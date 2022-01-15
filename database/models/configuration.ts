const {Model} = require('sequelize')
import ConfigurationType from '../../types/configuration'

module.exports = (sequelize: any, DataTypes: any) => {
    class Configuration extends Model<ConfigurationType> implements ConfigurationType {
        id!: string
        brand_id?: string
        model_id?: string
        generation_id?: string
        year_from?: Date
        year_until?: Date
        engine_volume_from?: number
        engine_volume_until?: number
        price_from?: number
        price_until?: number
        type?: string
        transmission?: string
        mileage_from?: number
        mileage_until?: number
        location_id?: string

        static associate(models: any) {
            Configuration.belongsToMany(models.Order, {
                as: 'order_configuration',
                through: 'Order_Configuration',
                foreignKey: 'configuration_id'
            })
            Configuration.belongsTo(models.Location, {
                foreignKey: 'location_id'
            })
            Configuration.belongsTo(models.CarBrand, {
                foreignKey: 'brand_id'
            })
            Configuration.belongsTo(models.CarModel, {
                foreignKey: 'model_id'
            })
            Configuration.belongsTo(models.CarGeneration, {
                foreignKey: 'generation_id'
            })
        }
    }

    Configuration.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'CarBrand',
                key: 'id'
            }
        },
        model_id: {
            type: DataTypes.UUID,
            allowNull: true,
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
        year_from: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        year_until: {
            allowNull: true,
            type: DataTypes.DATEONLY
        },
        engine_volume_from: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        engine_volume_until: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        price_from: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        price_until: {
            allowNull: true,
            type: DataTypes.FLOAT
        },
        type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        transmission: {
            allowNull: true,
            type: DataTypes.STRING
        },
        mileage_from: {
            type: DataTypes.INTEGER
        },
        mileage_until: {
            type: DataTypes.INTEGER
        },
        location_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Location',
                key: 'id'
            }
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Configuration'
    })

    return Configuration
};