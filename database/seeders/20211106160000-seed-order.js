const uuid = require('uuid')
const faker = require('faker')
const clients = require('./20211106085323-seed-client')
const managers = require('./20211106093024-seed-manager')

const statuses = ['Created', 'Approved', 'Awaiting payment', 'Paid', 'In work', 'Finished', 'Delivered']
const orders = []

let i = 0;
while (i < 20) {
    orders.push({
        id: uuid.v4(),
        status: statuses[randomInteger(0, statuses.length - 1)],
        date: faker.date.recent(),
        client_id: clients.clients[randomInteger(0, clients.clients.length - 1)].person_id,
        manager_id: managers.managers[randomInteger(0, managers.managers.length - 1)].person_id,
        sum: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    i++
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    orders: orders,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Order', orders, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Order', null, {})
    }
}