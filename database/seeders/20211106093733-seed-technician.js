const locations = require('./20211105194523-seed-location');
const employees = require('./20211106091456-seed-employee');

const technicians = [];

for (let i = 0; i < 5; i++) {
  technicians.push({
    person_id: employees.employees[i].person_id,
    location_id: locations.locations[randomInteger(0, locations.locations.length - 1)].id,
    creationDate: new Date()
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  technicians: technicians,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Technician', technicians, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Technician', null, {});
  }
};
