const {Model} = require('sequelize');
import {EquipmentType} from '../../types/equipment'

module.exports = (sequelize: any, DataTypes: any) => {
    class Equipment extends Model<EquipmentType> implements EquipmentType {
        id!: string
        name!: string

        static associate(models: any) {
            Equipment.belongsToMany(models.Car, {
                as: 'car_equipment',
                through: 'Car_Equipment',
                foreignKey: 'equipment_id'
            })
        }
    }

    Equipment.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Equipment'
    })

    return Equipment
};