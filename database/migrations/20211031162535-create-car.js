'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Car', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      vin: {
        type: DataTypes.STRING(17),
        allowNull: true,
      },
      registrationNumber: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      drive: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      transmission: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      market_name: {
        type: DataTypes.STRING(30),
        allowNull: true
      },
      marketplace_link: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Provided link is not a valid URL address'
          }
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      brand_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CarBrand',
          key: 'id'
        }
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CarModel',
          key: 'id'
        }
      },
      generation_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'CarGeneration',
          key: 'id'
        }
      },
      engine_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Engine',
          key: 'id'
        }
      },
      location_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Location',
          key: 'id'
        }
      },
      mainImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Car');
  }
};
