import axios from "axios"
import { dummyCarWithImages } from "../models/Car"

export const getCarsByTechnicianId = async (technicianId:string) => {
  axios.get(`${process.env.REACT_APP_API_URL}/cars/techniciancars/${technicianId}`).then((res) =>{
    return res.data
  }).catch((e) => {
    console.log('Something went wrong', e);
  } );
}

export const getReportsByCarId = async  (carId:string) => {
      return await axios.get('', { params: { carId } }).catch((e) => {
        console.log('Something went wrong: ', e);
      });
}

export const getCarById = async (carId:String) => {

  if(carId === 'test') {
    return dummyCarWithImages;
  }
  axios.get('', { params: { carId } }).then((res) => {
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