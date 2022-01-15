import {Model} from 'sequelize'
import {PersonType} from '../../types/person'

module.exports = (sequelize: any, DataTypes: any) => {
    class Person extends Model<PersonType> implements PersonType {
        id!: string
        first_name!: string
        last_name!: string

        static associate(models: any) {
            Person.hasOne(models.Client, {
                foreignKey: 'person_id'
            })
            Person.hasOne(models.Employee, {
                foreignKey: 'person_id'
            })
        }
    }

    Person.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Person'
    })

    return Person
};