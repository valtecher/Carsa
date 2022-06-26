import axios from "axios"
import { dummyCar, dummyCarWithImages } from "../models/Car"
import { dummyEngineReport, dummyGearboxReport } from "../models/Report"

export const getCarsByLocation = async (coords?:GeolocationCoordinates) => {
  return [ dummyCar, dummyCar, dummyCarWithImages ]

  // axios.get('', { params: { coords } }).then((res) =>{
  //   return res.data
  // }).catch((e) => {
  //   console.log('Something went wrong', e);
  // } );
}

export const getReportsByCarId = async  (carId:string) => {
  if(carId === 'test'){
    return { data:  [ dummyEngineReport, dummyGearboxReport ]}
  } else {
      return await axios.get('', { params: { carId } }).catch((e) => {
        console.log('Something went wrong: ', e);
      });
  }
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

export const getLastCars = async() => {
  return { data: [ dummyCar, dummyCar ]}
}