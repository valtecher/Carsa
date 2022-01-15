const _ = require('lodash')
const data = require('../../scraper/parsed_data.json')

const generations = _.flattenDeep(data
    .map(brand => brand.models
        .filter(model => model.generations !== null)
        .map(model => model.generations
            .map(generation => {
                return {
                    id: generation.generation_id,
                    name: generation.generation_name,
                    start_year: generation.start_year,
                    end_year: generation.end_year,
                    model_id: model.model_id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        )
    )
)

module.exports = {
    generations: generations,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('CarGeneration', generations, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('CarGeneration', null, {})
    }
}