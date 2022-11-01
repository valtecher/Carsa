const uuid = require('uuid');
const {faker} = require('@faker-js/faker');
const cars = require('./20211106103041-seed-car');
const technicians = require('./20211106093733-seed-technician');

const overviews = [];

let i = 0;
while (overviews.length < 5) {
  overviews.push({
    id: uuid.v4(),
    date: faker.date.recent(),
    car_id: cars.cars[i * 2].id,
    technician_id: technicians.technicians[i].person_id
  });
  i++;
}

module.exports = {
  overviews: overviews,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ReportOverview', overviews, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ReportOverview', null, {});
  }
};
