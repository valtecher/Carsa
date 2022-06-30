const _ = require('lodash');
const data = require('../../scraper/parsed_data.json');

const generations = _.flattenDeep(
  data.map((brand) =>
    brand.models
      .filter((model) => model.generations !== null)
      .map((model) =>
        model.generations.map((generation) => {
          return {
            id: generation.generation_id,
            name: generation.generation_name,
            start_year: Number(generation.start_year),
            end_year: Number(generation.end_year),
            model_id: model.model_id
          };
        })
      )
  )
);

module.exports = {
  generations: generations,

  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CarGeneration', generations, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CarGeneration', null, {});
  }
};
