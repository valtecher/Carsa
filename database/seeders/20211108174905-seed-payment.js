const uuid = require('uuid')
const orders = require('./20211106160000-seed-order')

const payments = []

for (let i = 0; i < 20; i++) {
    const amount = (100 + Math.random() * 5000).toFixed(2)

    payments.push({
        id: uuid.v4(),
        date: new Date(),
        amount: amount,
        sum: Math.random() > 0.5 ? amount : amount + randomInteger(100, 1500),
        order_id: orders.orders[randomInteger(0, orders.orders.length - 1)].id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    payments: payments,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Payment', payments, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Payment', null, {})
    }
}