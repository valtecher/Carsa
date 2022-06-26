'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Employee', {
      person_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Person',
          key: 'id'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is not valid'
          }
        }
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Employee');
  }
};
