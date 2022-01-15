const uuid = require('uuid')
const faker = require('faker')
const overviews = require('./20211106170308-seed-report-overview')
const types = require('./20211106165728-seed-report-type')

const reports = []

for (let i = 0; i < overviews.overviews.length; i++) {
    for (let j = 0; j < types.reportTypes.length; j++) {
        reports.push({
            id: uuid.v4(),
            overview_id: overviews.overviews[i].id,
            type_id: types.reportTypes[j].id,
            condition: randomInteger(0, 100),
            details: faker.lorem.paragraph(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    reports: reports,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Report', reports, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Report', null, {})
    }
}