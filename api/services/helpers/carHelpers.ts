import { Transaction } from 'sequelize';
import Logger from '../../../logger';
import db from '../../../database/models';
import reportHelpers from './reportHelpers';
import { updateLocation } from './locationHelper';
import { updateEngine } from './engineHelpers';

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
      { model: db.Location },
      {model: db.ReportOverview }
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
      { model: db.Location },
      { model: db.ReportOverview, include: [{model: db.Report, include: [ db.ReportType ]}] }
    ]
  });

  if (!car) {
    return { success: false, message: "Car with provided id doesn't exist" };
  }

  car.dataValues.Reports = (await reportHelpers.getRecentCarReports(car.id)).reports;

  return { success: true, car };
};

const getAllCarsByLocationState = async (location) => {
  const cars = await getAllCars({});
  return cars.filter((car) => car.Location.state === location);
}

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

const updateCarById = async (carId: string, carBody: any) => {
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

    if(carBody.Location){
      updateLocation(carBody.Location);
    }

    if( carBody.Engine) {
      updateEngine(carBody.Engine);
    }

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
    Logger.warn(error);
    return { success: false, message: 'Something went wrong' };
  }
};


export const findEngineByCharacteristics = async (power: string, volume: string, fuelType: string, version?: string) => {
  const engines = await db.Engine.findAll({
      where: {
          power: power.replace('KM', ''),
          fuel_type: fuelType,
          volume: volume.replace('cm3', ''),
      }
  })

  if (engines.length === 0) {
      console.log('no engine found, creating new engine');
      let engine: any;
      if (version) {
          engine = {
              name: version,
              volume: Number(volume.replace('cm3', '')),
              power: Number(power.replace('KM', '')),
              fuel_type: fuelType
          }
      } else {
          engine = {
              name: power.replace('KM', '') + volume.replace('cm3', '') + fuelType,
              volume: Number(volume.replace('cm3', '')),
              power: Number(power.replace('KM', '')),
              fuel_type: fuelType
          }
      }

      const createdEngineId = await db.Engine.create({...engine})
      return createdEngineId
  }

  return engines[0];
}


export const findCarName = async (brand: string, model: string, generation: string, generationStart: string, generationEnd: string) => {
  console.log(brand, model, generation, generationStart, generationEnd)
  const foundBrand = await findBrandByName(brand);
  const foundModel: any = await findModelByNameAndBrandId(foundBrand.id, model)
  const foundGeneration: any = await findGenerationByModelId(foundModel.id, generationStart, generationEnd, generation)
  return foundGeneration;
}

const findBrandByName = async (name: string) => {
  const brand: Array<any> = await db.CarBrand.findAll({
      where: {
          name
      }
  })

  if(brand.length === 0){
      const createdBrand = await db.CarBrand.create({ name })
      return createdBrand;
  }
  return brand[0]
}

const findModelByNameAndBrandId = async (brandId: string, name: string) => {
  const model = await db.CarModel.findAll({
      where: {
          name: name
      }
  })

  if (model.length === 0) {
      const createdModel = await db.CarModel.create({name, brand_id: brandId})
      await createdModel.save();
      return createdModel;
  }
  return model[0];
}

const findGenerationByModelId = async (modelId: string, startYear: string, endYear: string, name: string) => {

  const generation: any = await db.CarGeneration.findAll({
      where: {
          name: name.split('(')[0]
      },
      include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
  })

  if (generation.length === 0) {
      let generation;
      if (endYear === '') {
          const currentYear = new Date().getFullYear().toString();
          generation = await db.CarGeneration.create({
              name: name.split('(')[0],
              start_year: startYear,
              end_year: currentYear,
              model_id: modelId
          })
      } else {
          generation = await db.CarGeneration.create({
              name: name.split('(')[0],
              start_year: startYear,
              end_year: endYear,
              model_id: modelId
          })
      }
      await generation.save();
      const generationFound: any = await db.CarGeneration.findAll({
          where: {
              name: name.split('(')[0]
          },
          include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
      })
      return generationFound[0];
  }
  return generation[0];
}
const getGenerationByName = async (generationName:string) => { 
  const generation = await db.CarGeneration.findAll({ where: { name: generationName }, include: [{model: db.CarModel, include: [{model: db.CarBrand}]}] })
  return generation[0];
}

export default {
  getAllCars,
  getCarById,
  getAllCarsByLocationState,
  createCar,
  updateCarById,
  deleteCarById,

  findEngineByCharacteristics,
  getGenerationByName,
  findGenerationByModelId,
  findModelByNameAndBrandId,
  findBrandByName,
  findCarName,
};
