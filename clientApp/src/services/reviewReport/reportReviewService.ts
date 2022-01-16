import axios from 'axios';

export const getReportOverview = (carId:string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/overviews/bycar/${carId}`)
}

export const getAllReportsForCar = (carId: string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reports/car/${carId}`)
}

export const getReportsForOverview = (overviewId: string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reports/overview/${overviewId}`)
}



export const addReport = (reportBody:any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/reports`, reportBody)
}