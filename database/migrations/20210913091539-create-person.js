'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Person', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Must contain only alphabetical characters'
          },
          len: {
            args: [2, 60],
            msg: 'Must be in the range of 2-60'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          isAlpha: {
            msg: 'Must contain only alphabetical characters'
          },
          len: {
            args: [2, 60],
            msg: 'Must be in the range of 2-60'
          }
        }
      },
      roles: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM({
            values: Object.keys(PersonRoles).filter((v) => isNaN(Number(v)))
          })
        ),
        allowNull: false,
        defaultValue: []
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Person');
  }
};
