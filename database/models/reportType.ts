const {Model} = require('sequelize')
import {ReportTypeName, ReportTypeType} from '../../types/reportType'

module.exports = (sequelize: any, DataTypes: any) => {
    class ReportType extends Model<ReportTypeType> implements ReportTypeType {
        id!: string
        name!: ReportTypeName

        static associate(models: any) {
            ReportType.hasMany(models.Report, {
                foreignKey: 'type_id'
            })
        }
    }

    ReportType.init({
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
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'ReportType'
    })

    return ReportType
};