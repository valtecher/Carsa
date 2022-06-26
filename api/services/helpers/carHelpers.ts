import sequelize, { Transaction } from 'sequelize';
import db from '../../../database/models';
import reportHelpers from './reportHelpers'

const getAllCars = async ({ limit = Number.MAX_SAFE_INTEGER, offset = 0 }: { limit?: number, offset?: number }) => {
    const cars = await db.Car.findAll({
        attributes: {
            exclude: [
                'brand_id',
                'model_id',
                'generation_id',
                'engine_id'
            ]
        },
        include: [
            { model: db.CarBrand, as: 'Brand' },
            { model: db.CarModel, as: 'Model', attributes: ['id', 'name'] },
            { model: db.CarGeneration, as: 'Generation', attributes: ['id', 'name', 'start_year', 'end_year'] },
            { model: db.Engine }
        ],
        limit,
        offset,
        raw: true,
        nest: true
    });

    return cars;
};

const getCarById = async (carId: string) => {
    const car = await db.Car.findByPk(carId, {
        attributes: {
            exclude: [
                'brand_id',
                'model_id',
                'generation_id',
                'engine_id',
            ]
        },
        include: [
            { model: db.CarBrand, as: 'Brand' },
            { model: db.CarModel, as: 'Model', attributes: ['id', 'name'] },
            { model: db.CarGeneration, as: 'Generation', attributes: ['id', 'name', 'start_year', 'end_year'] },
            { model: db.Engine }
        ],
        raw: true,
        nest: true
    });

    if (!car) {
        return { success: false, message: 'Car with provided id doesn\'t exist' };
    }

    car.Reports = (await reportHelpers.getRecentCarReports(car.id)).reports;

    return { success: true, car };
};

const createCar = async (carBody: any) => {
    try {
        const newCarId = (await db.Car.create(carBody)).id;
        const car = (await getCarById(newCarId)).car;

        return { success: true, car }
    } catch (error) {
        console.error(error); // TODO: Log using logger
        return { success: false, message: 'Something went wrong' };
    }
};

const updateCarById = async (carId: string, carBody: any) => {
    try {
        const carToUpdate = await db.Car.findByPk(carId);
        await carToUpdate.update(carBody);

        const updatedCar = (await getCarById(carId)).car;

        return { success: true, car: updatedCar }
    } catch (error) {
        console.error(error); // TODO: Log using logger
        return { success: false, message: 'Something went wrong' };
    }
};

const deleteCarById = async (carId: string) => {
    try {
        await db.sequelize.transaction(async (transaction: Transaction) => {
            await db.Car_Equipment.destroy({
                where: {
                    car_id: carId
                }
            }, { transaction });

            await db.Car.destroy({
                where: {
                    id: carId
                }
            }, { transaction });
        });

        return { success: true }
    } catch (error) {
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
