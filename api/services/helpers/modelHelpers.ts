import db from '../../../database/models';

const getModelById = async (modelId: string) => {
  const model = await db.CarModel.findByPk(modelId);

  if (!model) {
    return { success: false, message: "Car model with provided id doesn't exist" };
  }

  return { success: true, model };
};

const getModelGenerations = async (modelId: string) => {
  if (!(await db.CarModel.findByPk(modelId))) {
    return { success: false, message: "Car model with provided id doesn't exist" };
  }

  const generations = await db.CarGeneration.findAll({
    attributes: { exclude: ['model_id'] },
    where: { model_id: modelId },
    raw: true,
    nest: true
  });

  return { success: true, generations };
};

export default {
  getModelById,
  getModelGenerations
};
