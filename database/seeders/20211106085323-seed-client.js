const faker = require('faker')
const bcrypt = require('bcryptjs')
const people = require('./20211106084607-seed-person')
const locations = require('./20211105194523-seed-location')

const clients = []

for (let i = 0; i < 10; i++) {
    const userCard = faker.helpers.userCard()

    clients.push({
        person_id: people.people[i].id,
        email: userCard.email,
        password: bcrypt.hashSync('qwerty123', 10),
        phone: faker.phone.phoneNumber('+(48) ### ### ###'),
        location_id: Math.random() > 0.5 ? locations.locations[randomInteger(0, locations.locations.length - 1)].id : null,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    clients: clients,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Client', clients, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Client', null, {})
    }
}