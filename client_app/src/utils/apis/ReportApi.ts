import axios from "axios"
import { IReport } from "../models/Report"

export const createReports = (reports:any) => {
  axios.post(`${process.env.REACT_APP_API_URL}/reports/save`, {...reports}).catch((e) => {console.log(e)})
}

export const updateReport = async (report:IReport) => {
  console.log(report);
  return await axios.put(`${process.env.REACT_APP_API_URL}/reports/update`, {...report}).catch((e) => {
    console.log(e);
  })
}