const uuid = require('uuid')
const faker = require('faker')

const people = []

for (let i = 0; i < 20; i++) {
    people.push({
        id: uuid.v4(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    people: people,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Person', people, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Person', null, {})
    }
}