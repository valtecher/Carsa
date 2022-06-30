const { Model } = require('sequelize');
import { ReportTypeName, ReportTypeType, isReportTypeName, reportTypes } from '../../types/reportType';

module.exports = (sequelize: any, DataTypes: any) => {
  class ReportType extends Model<ReportTypeType> implements ReportTypeType {
    id!: string;
    name!: ReportTypeName;

    static associate(models: any) {
      ReportType.hasMany(models.Report, {
        foreignKey: 'type_id'
      });
    }
  }

  ReportType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          customValidator(value) {
            if (!isReportTypeName(value)) {
              throw new Error(
                `Report type name should be one of the following: [${reportTypes.map((v) => `'${v}'`).join(', ')}]`
              );
            }
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'ReportType',
      freezeTableName: true,
      timestamps: false
    }
  );

  return ReportType;
};
