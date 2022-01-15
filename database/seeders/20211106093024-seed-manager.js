const employees = require("./20211106091456-seed-employee")
const managers = []

for (let i = 0; i < 5; i++) {
    managers.push({
        person_id: employees.employees[i].person_id,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    managers: managers,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Manager', managers, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Manager', null, {})
    }
}