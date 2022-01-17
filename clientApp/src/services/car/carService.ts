import axios from 'axios';

export const getCarById = async (carId:string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/car/${carId}`)
}

export const getAllCars = async () => {
  return  axios.get(`${process.env.REACT_APP_API_URL}/cars`)
}

export const getAllCarBrands = async () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/brands`)
}

export const getAllCarModelsWithBrand = async (brand_name: string) => {

  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/models`, { headers: { brand_name } })
}

export const getAllCarGenerations = async (model_name:string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/generations`, { headers: { model_name } })
}



