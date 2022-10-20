import axios from "axios"
import { dummyPayment } from "../models/Payments"

export const getLastPayments = async (clientId:string) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/payments/client/${clientId}`).then((res) => {
    return res.data
  })
}