'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Order', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING
            },
            client_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Client',
                    key: 'person_id'
                }
            },
            manager_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Manager',
                    key: 'person_id'
                }
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('Order')
    }
}