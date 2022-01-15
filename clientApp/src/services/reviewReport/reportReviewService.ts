import axios from 'axios';

export const getReportOverview = (carId:string) => {
  return axios.get(`http://localhost:3000/api/overviews/bycar/${carId}`)
}

export const getAllReportsForCar = (carId: string) => {
  return axios.get(`http://localhost:3000/api/reports/car/${carId}`)
}

export const getReportsForOverview = (overviewId: string) => {
  return axios.get(`http://localhost:3000/api/reports/overview/${overviewId}`)
}



export const addReport = (reportBody:any) => {
  return axios.post('http://localhost:3000/api/reports', reportBody)
}