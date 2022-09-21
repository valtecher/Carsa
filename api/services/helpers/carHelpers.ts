import { Transaction } from 'sequelize';
import Logger from '../../../logger';
import db from '../../../database/models';
import reportHelpers from './reportHelpers';

const getAllCars = async ({ limit = Number.MAX_SAFE_INTEGER, offset = 0 }: { limit?: number; offset?: number }) => {
  const cars = await db.Car.findAll({
    attributes: {
      exclude: ['brand_id', 'model_id', 'generation_id', 'engine_id', 'generation_id']
    },
    include: [
      { model: db.CarBrand },
      { model: db.CarModel, attributes: ['id', 'name'] },
      { model: db.CarGeneration, attributes: ['id', 'name', 'start_year', 'end_year'] },
      { model: db.Engine },
      { model: db.Location }
    ],
    limit,
    offset
  });

  return cars;
};

const getCarById = async (carId: string) => {
  const car = await db.Car.findByPk(carId, {
    attributes: {
      exclude: ['brand_id', 'model_id', 'generation_id', 'engine_id', 'location_id']
    },
    include: [
      { model: db.CarBrand },
      { model: db.CarModel, attributes: ['id', 'name'] },
      { model: db.CarGeneration, attributes: ['id', 'name', 'start_year', 'end_year'] },
      { model: db.Engine },
      { model: db.Location }
    ]
  });

  if (!car) {
    return { success: false, message: "Car with provided id doesn't exist" };
  }

  car.dataValues.Reports = (await reportHelpers.getRecentCarReports(car.id)).reports;

  return { success: true, car };
};

const createCar = async (carBody: unknown) => {
  try {
    const newCarId = (await db.Car.create(carBody)).id;
    const car = (await getCarById(newCarId)).car;

    return { success: true, car };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const updateCarById = async (carId: string, carBody: unknown) => {
  try {
    const carToUpdate = await db.Car.findByPk(carId);

    if (!carToUpdate) {
      return {
        success: false,
        message: "Car with provided id doesn't exist"
      };
    }

    await carToUpdate.update(carBody);
    const updatedCar = (await getCarById(carId)).car;

    return { success: true, car: updatedCar };
  } catch (err) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

const deleteCarById = async (carId: string) => {
  try {
    await db.sequelize.transaction(async (transaction: Transaction) => {
      await db.Car_Equipment.destroy(
        {
          where: {
            car_id: carId
          }
        },
        { transaction }
      );

      await db.Car.destroy(
        {
          where: {
            id: carId
          }
        },
        { transaction }
      );
    });

    return { success: true };
  } catch (error) {
    Logger.warn(err);
    return { success: false, message: 'Something went wrong' };
  }
};

export default {
  getAllCars,
  getCarById,
  createCar,
  updateCarById,
  deleteCarById
};
