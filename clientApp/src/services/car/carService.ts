import axios from 'axios';

export const getCarById = async (carId:string) => {
  return axios.get(`http://localhost:3000/api/cars/car/${carId}`)
}

export const getAllCars = async () => {
  return  axios.get('http://localhost:3000/api/cars')
}

export const getAllCarBrands = async () => {
  return axios.get('http://localhost:3000/api/cars/brands')
}

export const getAllCarModelsWithBrand = async (brand_name: string) => {
  console.log('hee')
  return await axios.get('http://localhost:3000/api/cars/models', { headers: { brand_name } })
}

export const getAllCarGenerations = async (model_name:string) => {
  return await axios.get('http://localhost:3000/api/cars/generations', { headers: { model_name } })
}



