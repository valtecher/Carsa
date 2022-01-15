'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('CarGeneration', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            end_year: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            model_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'CarModel',
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
        await queryInterface.dropTable('CarGeneration')
    }
}