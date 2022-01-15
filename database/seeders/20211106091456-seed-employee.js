const faker = require('faker')
const bcrypt = require('bcryptjs')
const people = require('./20211106084607-seed-person')

const employees = []

for (let i = 0; i < 10; i++) {
    employees.push({
        person_id: people.people[10 + i].id,
        email: faker.internet.email(),
        password: bcrypt.hashSync('qwerty123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    employees: employees,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Employee', employees, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Employee', null, {})
    }
}