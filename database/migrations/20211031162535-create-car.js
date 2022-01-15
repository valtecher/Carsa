'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Car', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            color: {
                allowNull: false,
                type: Sequelize.STRING
            },
            vin: {
                allowNull: true,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            mileage: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            drive: {
                allowNull: false,
                type: Sequelize.STRING
            },
            transmission: {
                allowNull: false,
                type: Sequelize.STRING
            },
            market_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            marketplace_link: {
                allowNull: false,
                type: Sequelize.STRING
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            generation_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'CarGeneration',
                    key: 'id'
                }
            },
            engine_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Engine',
                    key: 'id'
                }
            },
            location_id: {
                type: Sequelize.UUID,
                allowNull: false,
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
        await queryInterface.dropTable('Car')
    }
}