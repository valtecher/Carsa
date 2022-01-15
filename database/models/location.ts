const {Model} = require('sequelize')
import {LocationType} from '../../types/location'

module.exports = (sequelize: any, DataTypes: any) => {
    class Location extends Model<LocationType> implements LocationType {
        id!: string
        country!: string
        state!: string
        city!: string
        postal_code?: string
        street?: string
        house_number?: string
        apartment_number?: string

        static associate(models: any) {
            Location.hasMany(models.Configuration, {
                foreignKey: 'location_id'
            })
            Location.hasMany(models.Client, {
                foreignKey: 'location_id'
            })
            Location.hasMany(models.Technician, {
                foreignKey: 'location_id'
            })
            Location.hasMany(models.Car, {
                foreignKey: 'location_id'
            })
        }
    }

    Location.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true
        },
        house_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apartment_number: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Location'
    })

    return Location
};