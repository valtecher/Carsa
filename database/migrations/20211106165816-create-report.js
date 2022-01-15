'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Report', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            condition: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            details: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            overview_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'ReportOverview',
                    key: 'id'
                }
            },
            type_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'ReportType',
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
        await queryInterface.dropTable('Report')
    }
}