import {Model} from 'sequelize'
import {ClientType} from '../../types/client'

module.exports = (sequelize: any, DataTypes: any) => {
    class Client extends Model<ClientType> implements ClientType {
        person_id!: string
        email!: string
        password!: string
        phone!: string
        location_id?: string

        static associate(models: any) {
            Client.belongsTo(models.Person, {
                foreignKey: 'person_id'
            })
            Client.belongsTo(models.Location, {
                foreignKey: 'location_id'
            })
            Client.hasMany(models.Order, {
                foreignKey: 'client_id'
            })
        }
    }

    Client.init({
        person_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Person',
                key: 'id'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        location_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Location',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Client'
    })

    return Client
};