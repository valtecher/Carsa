const models = require('./20211105190655-seed-car-model');
const engines = require('./20211106100215-seed-engine');

const records = [];

for (let i = 0; i < 20; i++) {
  records.push({
    car_model_id: models.models[i].id,
    engine_id: engines.engines[i].id
  });
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CarModel_Engine', records, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CarModel_Engine', null, {});
  }
};
