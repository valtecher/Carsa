const {Model} = require('sequelize')
import {EmployeeType} from "../../types/employee"

module.exports = (sequelize: any, DataTypes: any) => {
    class Employee extends Model<EmployeeType> implements EmployeeType {
        person_id!: string
        email!: string
        password!: string

        static associate(models: any) {
            Employee.belongsTo(models.Person, {
                foreignKey: 'person_id'
            })
            Employee.hasOne(models.Manager, {
                foreignKey: 'person_id'
            })
            Employee.hasOne(models.Technician, {
                foreignKey: 'person_id'
            })
        }
    }

    Employee.init({
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
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Employee'
    })

    return Employee
};