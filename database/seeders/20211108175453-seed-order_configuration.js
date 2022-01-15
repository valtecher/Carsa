const orders = require('./20211106160000-seed-order')
const configurations = require('./20211106094746-seed-configuration')

const records = []

for (let i = 0; i < 20; i++) {
    records.push({
        order_id: orders.orders[i].id,
        configuration_id: configurations.configurations[i].id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Order_Configuration', records, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Order_Configuration', null, {})
    }
}