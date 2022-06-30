const { Model } = require('sequelize');
import { ReportType } from '../../types/report';

module.exports = (sequelize: any, DataTypes: any) => {
  class Report extends Model<ReportType> implements ReportType {
    id!: string;
    condition!: number;
    details!: string;
    overview_id!: string;
    type_id!: string;

    static associate(models: any) {
      Report.belongsTo(models.ReportOverview, {
        foreignKey: 'overview_id'
      });

      Report.belongsTo(models.ReportType, {
        foreignKey: 'type_id'
      });
    }
  }

  Report.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      condition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100
        }
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      overview_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'ReportOverview',
          key: 'id'
        }
      },
      type_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'ReportType',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Report',
      freezeTableName: true,
      createdAt: 'date',
      updatedAt: false
    }
  );

  return Report;
};
