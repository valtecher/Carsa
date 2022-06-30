const _ = require('lodash');
const data = require('../../scraper/parsed_data.json');

const models = _.flattenDeep(
  data.map((brand) =>
    brand.models.map((model) => {
      return {
        id: model.model_id,
        name: model.model_name,
        brand_id: brand.brand_id
      };
    })
  )
);

module.exports = {
  models: models,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CarModel', models, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CarModel', null, {});
  }
};
