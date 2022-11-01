const {faker} = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const people = require('./20211106084607-seed-person');

const employees = [];

for (let i = 0; i < 10; i++) {
  employees.push({
    person_id: people.people[10 + i].id,
    email: faker.internet.email(),
    password: bcrypt.hashSync('qwerty123', 10)
  });
}

module.exports = {
  employees: employees,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Employee', employees, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Employee', null, {});
  }
};
