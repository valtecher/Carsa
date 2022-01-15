const payments = require('./20211108174905-seed-payment')

const cardPayments = []

for (let i = 10; i < 20; i++) {
    cardPayments.push({
        payment_id: payments.payments[i].id,
        card_number: '4917484589897107',
        owner_name: 'JOHN MARTINEZ',
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('CardPayment', cardPayments, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('CardPayment', null, {})
    }
}