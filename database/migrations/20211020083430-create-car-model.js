'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('CarModel', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: 'compositeIndex'
      },
      brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'CarBrand',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CarModel');
  }
};
