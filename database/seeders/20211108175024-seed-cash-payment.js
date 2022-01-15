const payments = require('./20211108174905-seed-payment')

const cashPayments = []

for (let i = 0; i < 10; i++) {
    cashPayments.push({
        payment_id: payments.payments[i].id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('CashPayment', cashPayments, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('CashPayment', null, {})
    }
}