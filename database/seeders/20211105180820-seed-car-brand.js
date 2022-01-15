const data = require('../../scraper/parsed_data.json')

const brands = data.map(brand => {
    return {
        id: brand.brand_id,
        name: brand.brand_name,
        createdAt: new Date(),
        updatedAt: new Date()
    }
})

module.exports = {
    brands: brands,

    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('CarBrand', brands, {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('CarBrand', null, {})
    }
}