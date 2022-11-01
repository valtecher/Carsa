const uuid = require('uuid');
const {faker} = require('@faker-js/faker');

const people = [];

for (let i = 0; i < 20; i++) {
  people.push({
    id: uuid.v4(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName()
  });
}

module.exports = {
  people: people,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Person', people, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Person', null, {});
  }
};
