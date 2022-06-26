'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('ReportType', {
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ReportType');
  }
};
