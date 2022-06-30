const cars = require('./20211106103041-seed-car');
const equipments = require('./20211106132633-seed-equipment');

const records = [];

for (let i = 0; i < cars.cars.length; i++) {
  let set = new Set();

  while (set.size < 5) {
    set.add(equipments.equipments[randomInteger(0, equipments.equipments.length - 1)].id);
  }

  const iterator = set.values();

  for (let j = 0; j < 5; j++) {
    records.push({
      car_id: cars.cars[i].id,
      equipment_id: iterator.next().value
    });
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Car_Equipment', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Car_Equipment', null, {});
  }
};
