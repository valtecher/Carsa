'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Car_Order', {
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Order',
          key: 'id'
        }
      },
      car_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Car',
          key: 'id'
        }
      },
      start_reservation: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Timestamp when car reserved for this order only'
      },
      status: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          customValidator(value) {
            if (!isCarOrderStatus(value)) {
              throw new Error(
                `Status should be one of the following: [${carOrderStatuses.map((v) => `'${v}'`).join(', ')}]`
              );
            }
          }
        }
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Car_Order');
  }
};
