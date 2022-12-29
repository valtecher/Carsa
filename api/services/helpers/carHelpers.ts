import { Transaction } from 'sequelize';
import Logger from '../../../logger';
import db from '../../../database/models';
import reportHelpers from './reportHelpers';
import { getLocationByState, updateLocation } from './locationHelper';
import { updateEngine } from './engineHelpers';
import { uuid } from '../../../client_app/src/utils/helpers/uuid';
import moment from 'moment';

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

const createCar = async (carBody: any) => {
  try {

    if(!carBody.id || carBody.id === '') {
      carBody.id = uuid();
    }

    const location = await getLocationByState(carBody.location)
    const newCarId = (await db.Car.create({...carBody, location_id: location?.[0]?.id})).id;
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

const findGenerationByModelId = async (model_id: string, start_year: string, end_year: string, name: string) => {


  let generation: any; 
  if(start_year ) {
    generation = await db.CarGeneration.findAll({
      where: {
          model_id,
          start_year,
      },
      include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
  })
  } else {
    generation = await db.CarGeneration.findAll({
      where: {
          model_id,
      },
      include: [{model: db.CarModel, include: [{model: db.CarBrand}]}]
  })
  }
 

  if (generation.length === 0) {
      let generationToCreate;
      if (end_year === '') {
          const currentYear = new Date().getFullYear().toString();
          generationToCreate = await db.CarGeneration.create({
              name: name?.split('(')[0] ?? '',
              start_year: start_year ?? moment().toISOString(),
              end_year: currentYear,
              model_id: model_id
          })
      } else {
        const currentYear = new Date().getFullYear().toString();
        generationToCreate = await db.CarGeneration.create({
              name: name?.split('(')[0] ?? '',
              start_year: start_year ?? moment().toISOString(),
              end_year: currentYear,
              model_id: model_id
          })
      }
      await generationToCreate.save();
      return generationToCreate;
  }
  return generation[0];
}
const getGenerationByName = async (generationName:string) => { 
  const generation = await db.CarGeneration.findAll({ where: { name: generationName }, include: [{model: db.CarModel, include: [{model: db.CarBrand}]}] })
  return generation[0];
}

const getCarByDetails = async (car:any) => {
  return await db.Car.findAll({
    where: {
      registrationNumber: car?.registrationNumber || '',
      color: car?.color || '',
      transmission: car?.transmission || '',
      year: car?.year || ''
    }
  })
}

const getAllBrands = async () => {
    return await db.CarBrand.findAll();
}

const getBrandByName = async (brand:string) => {
  const brands = await db.CarBrand.findAll({
    where: {
      name: brand
    }
  })
  return brands;
}

const getAllModels = async (brand_id: string) => {
  return await db.CarModel.findAll({
    where: {
      brand_id
    }
  })
}

const getModelByName = async (modelName:string) => {
  return await db.CarModel.findAll({
    where: {
      name: modelName
    }
  })
} 

const getAllGenerations = async (model_id) => {
  return await db.CarGeneration.findAll({
    where: {
      model_id
    }
  })
}

const buyCar = async (car_id:string) => {
  const car_order = await db.Car_Order.findOne({ 
    where: {
      car_id
    }
   });
   const order = await db.Order.findByPk(car_order.order_id);
   
   await car_order.update({...car_order, status: 'Bought'});
   await order.update({...order, status: 'Finished'});

} 

const rejectCar = async (car_id: string ) => {
  const car_order = await db.Car_Order.findOne({ 
    where: {
      car_id
    }
   });
   await car_order.update({...car_order, status: 'Rejected'});
}

const getRejectedCars = async () => {
  const car_order = await db.Car_Order.findAll(); 
  const car_order_ids = car_order.map((car_order) => car_order.car_id);
  console.log(car_order_ids);

  const rejectedCars = await db.Car.findAll({
    where: {
      id: car_order_ids
    },
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
  })


  return rejectedCars;
}

export default {
  getAllCars,
  getCarById,
  getCarByDetails,
  getRejectedCars,
  getAllCarsByLocationState,

  getAllBrands,
  getAllModels,
  getAllGenerations,
  getBrandByName,
  getModelByName,
  getGenerationByName, 

  buyCar,
  rejectCar,

  createCar,
  updateCarById,
  deleteCarById,

  findEngineByCharacteristics,
  findGenerationByModelId,
  findModelByNameAndBrandId,
  findBrandByName,
  findCarName,
};
