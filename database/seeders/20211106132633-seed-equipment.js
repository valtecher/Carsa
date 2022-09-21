const uuid = require('uuid');

const equipmentNames = [
  'ABD',
  'ESP',
  'Gearbox lock',
  'Immobilizer',
  'Airbags',
  'Alarm',
  'Multi wheel',
  'Central locking',
  'Light sensor',
  'Climate control',
  'Start/Stop button',
  'Leather interior',
  'Cruise control',
  'Sunroof',
  'Seat memory',
  'Parking sensors',
  'Heated mirrors',
  'Heated steering wheel',
  'On-board computer'
];
const equipments = [];

for (let i = 0; i < equipmentNames.length; i++) {
  equipments.push({
    id: uuid.v4(),
    name: equipmentNames[i]
  });
}

module.exports = {
  equipments: equipments,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Equipment', equipments, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Equipment', null, {});
  }
};
