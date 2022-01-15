'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Configuration', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            brand_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'CarBrand',
                    key: 'id'
                }
            },
            model_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'CarModel',
                    key: 'id'
                }
            },
            generation_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'CarGeneration',
                    key: 'id'
                }
            },
            year_from: {
                allowNull: true,
                type: Sequelize.DATEONLY
            },
            year_until: {
                allowNull: true,
                type: Sequelize.DATEONLY
            },
            engine_volume_from: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            engine_volume_until: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            price_from: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            price_until: {
                allowNull: true,
                type: Sequelize.FLOAT
            },
            type: {
                allowNull: true,
                type: Sequelize.STRING
            },
            transmission: {
                allowNull: true,
                type: Sequelize.STRING
            },
            mileage_from: {
                type: Sequelize.INTEGER
            },
            mileage_until: {
                type: Sequelize.INTEGER
            },
            location_id: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'Location',
                    key: 'id'
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Configuration')
    }
}