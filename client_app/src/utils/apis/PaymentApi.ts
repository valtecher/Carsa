import { dummyPayment } from "../models/Payments"

export const getLastPayments = async (clientId:string) => {
  return { data: [dummyPayment, dummyPayment] }
}