import axios from "axios"
import { CarType } from "../models/Car"

export const getCarsByTechnicianId = async (technicianId:string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/techniciancars/${technicianId}`).then((res) =>{
    return res.data.cars
  }).catch((e) => {
    console.error('Something went wrong', e);
  });
}

export const getReportsByCarId = async  (carId:string) => {
      return await axios.get('', { params: { carId } }).catch((e) => {
        console.error('Something went wrong: ', e);
      });
}

export const getCarById = async (carId:String) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/${carId}`).then((res) => {
    return res.data;
  }).catch((e) => {
    console.error('Something went wrong', e)
  })
}

export const getLastCars = async (clientId:string) => { 
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/getclientcars/${clientId}`).then((res) => {
    return res.data;
  }).catch((e) => {
    console.error('Something went wrong', e);
  });
}

export const getAllBrands = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/brands`).then((res) => {
    return res.data;
  })
}

export const getAllModelsForBrand = async (brand: string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/models`, {params: { name: brand }}).then((res) => {
    return res.data;
  })
}

export const getAllGenerationsForModel = async (model: string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/generations`, { params: { name: model } }).then((res) => {
    return res.data;
  })
}

export const getRejectedCars = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/rejected`).then((res) => {
    return res.data
  }).catch((e) => e)
}

export const buyCar = async (carid:string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/buy/${carid}`);
}

export const rejectCar = async (carid: string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/reject/${carid}`);
}

export const updateCar = async (car:CarType) => {
  return await axios.put(`${process.env.REACT_APP_API_URL}/cars/${car.id}`, { ...car }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.error('Something went wrong', e);
  });
} 
