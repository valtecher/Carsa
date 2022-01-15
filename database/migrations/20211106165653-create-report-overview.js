'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ReportOverview', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            car_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Car',
                    key: 'id'
                }
            },
            technician_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Technician',
                    key: 'person_id'
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
        await queryInterface.dropTable('ReportOverview')
    }
}