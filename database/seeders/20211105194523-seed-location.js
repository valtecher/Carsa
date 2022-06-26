const uuid = require('uuid');
const faker = require('faker');

const locations = [];

for (let i = 0; i < 20; i++) {
  const rand = Math.random() > 0.5;

  locations.push({
    id: uuid.v4(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.cityName(),
    postal_code: rand ? faker.address.zipCode() : null,
    street: rand ? faker.address.streetName() : null
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
