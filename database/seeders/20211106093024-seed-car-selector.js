const employees = require('./20211106091456-seed-employee');
const selectors = [];

for (let i = 0; i < 5; i++) {
  selectors.push({
    person_id: employees.employees[i].person_id,
    creationDate: new Date()
  });
}

module.exports = {
  selectors: selectors,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CarSelector', selectors, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CarSelector', null, {});
  }
};
