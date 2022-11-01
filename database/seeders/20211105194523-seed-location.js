const uuid = require('uuid');
const {faker} = require('@faker-js/faker');

const locations = [];

for (let i = 0; i < 20; i++) {
  locations.push({
    id: uuid.v4(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.cityName(),
    postal_code: faker.address.zipCode(),
    street: faker.address.street()
  });
}

module.exports = {
  locations: locations,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Location', locations, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Location', null, {});
  }
};
