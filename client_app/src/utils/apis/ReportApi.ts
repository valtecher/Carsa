import axios from "axios"
import { IReport } from "../models/Report"

export const createReports = async (reports:any) => {
  return await  axios.post(`${process.env.REACT_APP_API_URL}/reports/save`, {...reports}).catch((e) => {console.error(e)})
}

export const getExistingReportsForCar = async (car_id: string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/reports/${car_id}`)
}

export const updateReport = async (report:IReport) => {
  return await axios.put(`${process.env.REACT_APP_API_URL}/reports/update`, {...report}).catch((e) => {
    console.error(e);
  })
}