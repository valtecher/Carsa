import axios from "axios"

export const createReports = (reports:any) => {
  axios.post(`${process.env.REACT_APP_API_URL}/save`, {body: reports}).catch((e) => {console.log(e)})
}