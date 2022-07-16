import db from '../../../database/models';

const getAllBrands = async ({ limit = Number.MAX_SAFE_INTEGER, offset = 0 }: { limit?: number; offset?: number }) => {
  const brands = await db.CarBrand.findAll({
    limit,
    offset,
    raw: true,
    nest: true
  });

  return brands;
};

const getBrandById = async (brandId: string) => {
  const brand = await db.CarBrand.findByPk(brandId);

  if (!brand) {
    return { success: false, message: "Car brand with provided id doesn't exist" };
  }

  return { success: true, brand };
};

const getBrandModels = async (brandId: string) => {
  if (!(await db.CarBrand.findByPk(brandId))) {
    return { success: false, message: "Car brand with provided id doesn't exist" };
  }

  const models = await db.CarModel.findAll({
    attributes: { exclude: ['brand_id'] },
    where: { brand_id: brandId },
    raw: true,
    nest: true
  });

  return { success: true, models };
};

export default {
  getAllBrands,
  getBrandById,
  getBrandModels
};
