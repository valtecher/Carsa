const {Model} = require('sequelize')
import {ReportType} from '../../types/report'

module.exports = (sequelize: any, DataTypes: any) => {
    class Report extends Model<ReportType> implements ReportType {
        id!: string
        condition!: string
        details!: string
        overview_id!: string
        type_id!: string

        static associate(models: any) {
            Report.belongsTo(models.ReportOverview, {
                foreignKey: 'overview_id'
            })
            Report.belongsTo(models.ReportType, {
                foreignKey: 'type_id'
            })
        }
    }

    Report.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        condition: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        details: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        overview_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ReportOverview',
                key: 'id'
            }
        },
        type_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'ReportType',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'Report'
    })

    return Report
};