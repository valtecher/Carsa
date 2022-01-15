import { CarType } from "../../interfaces/models/car"
export const car: CarType = {
  id: 'hub',
  mainImage: '/images/home/audi-a4-to-c7b33837cde1c592379b2.jpg.webp',
  description: 'description',
  brand: 'Audi',
  model: 'A5',
  generation: 'V',
  price: 12000,
  type: 'type',
  market: 'OtoMoto',
  mileage: 200000,
  color: 'red',
  drive: 'drive',
  year: '2019',
  gearBox: 'gearBox',
  Engine: {name: 'engine', volume: '3.0', power: 279, fuel_type: 'diesel'},
  CarGeneration: {
      id: '82fe67f9-8e66-425e-a853-520d8669be41',
      model_id: '82fe67f9-8e66-425e-a853-520d8669be41',
      name: 'generationName',
      start_year: '2018',
      end_year: '2019',
      CarModel: {
          id: '82fe67f9-8e66-425e-a853-520d8669be41',
          name: 'modelName',
          brand_id: '82fe67f9-8e66-425e-a853-520d8669be41',
          CarBrand: {
              id: '82fe67f9-8e66-425e-a853-520d8669be41',
              name: 'brandName'
          },
      },
  },
  images: [],
  equipment: [],
}

export const typeMock =  [
    {id: 0, name: 'All'},
    { id: 1, value: 'hatch', name: 'Hatch'},
    { id: 2, value: 'sedan', name: 'Sedan'},
    { id: 3, value: 'van', name: 'Van'},
    { id: 4, value: 'suv', name: 'SUV'},
    { id: 5, value: 'van', name: 'Combi'},
    { id: 6, value: 'city_car', name: 'Small'},
]

export const fuelTypeMock = [
    {id: 0, name: 'All'},
    { id: 1, name: 'Petrol' },
    { id: 2, name: 'Diesel' },
    { id: 3, name: 'Petrol/LPG' },
    { id: 4, name: 'Electric' },
]


export const gearboxTypeMock = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Manual'},
    {id: 2, name: 'Semi-Auto'},
    {id: 3, name: 'Auto'},
    {id: 4, name: 'Robot'},
    {id: 5, name: 'Sequential'},
]

export const driveTypeMock = [
    {id: 0, name: 'All'},
    {id: 1, name: 'FrontWheelDrive'},
    {id: 2, name: 'RearWheelDrive'},
    { id: 3, name: '4x4' },
]
