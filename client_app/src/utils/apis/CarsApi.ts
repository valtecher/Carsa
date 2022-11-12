import axios from "axios"
import { CarType, dummyCarWithImages } from "../models/Car"

export const getCarsByTechnicianId = async (technicianId:string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/techniciancars/${technicianId}`).then((res) =>{
    return res.data.cars
  }).catch((e) => {
    console.log('Something went wrong', e);
  });
}

export const getReportsByCarId = async  (carId:string) => {
      return await axios.get('', { params: { carId } }).catch((e) => {
        console.log('Something went wrong: ', e);
      });
}

export const getCarById = async (carId:String) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/${carId}`).then((res) => {
    return res.data;
  }).catch((e) => {
    console.log('Something went wrong', e)
  })
}

export const getLastCars = async (clientId:string) => { 
  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/getclientcars/${clientId}`).then((res) => {
    return res.data;
  }).catch((e) => {
    console.log('Something went wrong', e);
  });
}

export const updateCar = async (car:CarType) => {
  return await axios.put(`${process.env.REACT_APP_API_URL}/cars/${car.id}`, { ...car }).then((res) => {
    return res.data;
  }).catch((e) => {
    console.log('Something went wrong', e);
  });;
} 