import { Transaction } from 'sequelize';
import Logger from '../../../logger';
import db from '../../../database/models';

const getAllConfigurations = async ({
  limit = Number.MAX_SAFE_INTEGER,
  offset = 0
}: {
  limit?: number;
  offset?: number;
}) => {
  const configurations = await db.Configuration.findAll({
    attributes: {
      exclude: ['brand_id', 'model_id', 'generation_id', 'location_id']
    },
    include: [
      { model: db.CarBrand },
      { model: db.CarModel, attributes: { exclude: ['brand_id'] } },
      { model: db.CarGeneration, attributes: { exclude: ['model_id'] } },
      { model: db.Location }
    ],
    limit,
    offset
  });

  return configurations;
};

const getConfigurationById = async (configurationId: string) => {
  const configuration = await db.Configuration.findByPk(configurationId, {
    attributes: {
      exclude: ['brand_id', 'model_id', 'generation_id', 'location_id']
    },
    include: [
      { model: db.CarBrand },
      { model: db.CarModel, attributes: { exclude: ['brand_id'] } },
      { model: db.CarGeneration, attributes: { exclude: ['model_id'] } },
      { model: db.Location }
    ]
  });

  if (!configuration) {
    return {
      success: false,
      message: "Configuration with provided id doesn't exist"
    };
  }

  return { success: true, configuration };
};

const createConfiguration = async (configurationBody: unknown) => {
  try {
    const newConfigurationId = (await db.Configuration.create(configurationBody)).id;
    const configuration = (await getConfigurationById(newConfigurationId)).configuration;

    return { success: true, configuration };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const updateConfigurationById = async (configurationId: string, configurationBody: unknown) => {
  try {
    const configurationToUpdate = await db.Configuration.findByPk(configurationId);

    if (!configurationToUpdate) {
      return {
        success: false,
        message: "Configuration with provided id doesn't exist"
      };
    }

    await configurationToUpdate.update(configurationBody);
    const updatedConfiguration = (await getConfigurationById(configurationId)).configuration;

    return { success: true, configuration: updatedConfiguration };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const deleteConfigurationById = async (configurationId: string) => {
  try {
    await db.sequelize.transaction(async (transaction: Transaction) => {
      await db.Configuration.destroy(
        {
          where: {
            id: configurationId
          }
        },
        { transaction }
      );
    });

    return { success: true };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

export default {
  getAllConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfigurationById,
  deleteConfigurationById
};
