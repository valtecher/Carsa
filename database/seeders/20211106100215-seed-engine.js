const uuid = require('uuid');
const {faker} = require('@faker-js/faker');

const names = [
  'TFSI',
  'TDI',
  'TSI',
  'JTDM',
  'EcoBoost',
  'TDCi',
  'i-VTEC',
  'CRDi',
  'CDI',
  'Bluetec',
  'PHEV',
  'HDi',
  'dCi',
  'T2'
];
const engines = [];

for (let i = 0; i < 20; i++) {
  const fuelType = faker.vehicle.fuel();

  engines.push({
    id: uuid.v4(),
    name: names[randomInteger(0, names.length - 1)],
    volume: fuelType === 'Electric' ? null : (1 + Math.random() * 4).toFixed(2),
    power: randomInteger(79, 400),
    fuel_type: fuelType
  });
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  engines: engines,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Engine', engines, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Engine', null, {});
  }
};
