import db from '../../../database/models';

const getGenerationById = async (generationId: string) => {
  const generation = await db.CarGeneration.findByPk(generationId);

  if (!generation) {
    return { success: false, message: "Car generation with provided id doesn't exist" };
  }

  return { success: true, generation };
};

export default {
  getGenerationById
};
