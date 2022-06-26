const uuid = require('uuid');
const typeNames = ['Interior', 'Exterior', 'Engine', 'Suspension', 'Legal', 'Transmission'];
const reportTypes = [];

for (let i = 0; i < typeNames.length; i++) {
  reportTypes.push({
    id: uuid.v4(),
    name: typeNames[i]
  });
}

module.exports = {
  reportTypes: reportTypes,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ReportType', reportTypes, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ReportType', null, {});
  }
};
