import {ManagerType} from '../../types/manager'
import {Model} from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
    class Manager extends Model<ManagerType> implements ManagerType {
        person_id!: string

        static associate(models: any) {
            Manager.belongsTo(models.Employee, {
                foreignKey: 'person_id'
            })
            Manager.hasMany(models.Order, {
                foreignKey: 'manager_id'
            })
        }
    }

    Manager.init({
        person_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Employee',
                key: 'person_id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Manager'
    })

    return Manager
};