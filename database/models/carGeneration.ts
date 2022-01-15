const {Model} = require('sequelize')
import {CarGenerationType} from '../../types/carGeneration'

module.exports = (sequelize: any, DataTypes: any) => {
    class CarGeneration extends Model<CarGenerationType> implements CarGenerationType {
        id!: string
        name!: string
        start_year!: number
        end_year?: number
        model_id!: string

        static associate(models: any) {
            CarGeneration.hasMany(models.Car, {
                foreignKey: 'generation_id'
            })
            CarGeneration.hasMany(models.Configuration, {
                foreignKey: 'generation_id'
            })
            CarGeneration.belongsTo(models.CarModel, {
                foreignKey: 'model_id'
            })
        }
    }

    CarGeneration.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start_year: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            end_year: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            model_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'CarModel',
                    key: 'id'
                }
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['name', 'model_id']
                }
            ],
            sequelize,
            freezeTableName: true,
            modelName: 'CarGeneration'
        }
    )

    return CarGeneration
}