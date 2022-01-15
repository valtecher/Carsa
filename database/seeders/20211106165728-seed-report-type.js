const uuid = require('uuid')
const typeNames = ['Interior', 'Exterior', 'Engine', 'Suspension', 'Legal', 'Transmission']
const reportTypes = []

for (let i = 0; i < typeNames.length; i++) {
    reportTypes.push({
        id: uuid.v4(),
        name: typeNames[i],
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    reportTypes: reportTypes,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('ReportType', reportTypes, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ReportType', null, {})
    }
}