const {Model} = require('sequelize')
import {CarModelType} from '../../types/carModel'

module.exports = (sequelize: any, DataTypes: any) => {
    class CarModel extends Model<CarModelType> implements CarModelType {
        id!: string;
        name!: string;
        brand_id!: string;

        static associate(models: any) {
            CarModel.belongsToMany(models.Engine, {
                as: 'carModel_engine',
                through: 'CarModel_Engine',
                foreignKey: 'car_model_id'
            })
            CarModel.hasMany(models.Configuration, {
                foreignKey: 'model_id'
            })
            CarModel.belongsTo(models.CarBrand, {
                foreignKey: 'brand_id'
            })
            CarModel.hasMany(models.CarGeneration, {
                foreignKey: 'model_id'
            })
            CarModel.hasMany(models.Car, {
                foreignKey: 'model_id'
            })
        }
    }

    CarModel.init({
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
            brand_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'CarBrand',
                    key: 'id'
                }
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['name', 'brand_id']
                }
            ],
            sequelize,
            freezeTableName: true,
            modelName: 'CarModel'
        }
    )

    return CarModel
};