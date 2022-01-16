import axios from 'axios';



export const createOrderOnServer = async (payload:any) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/orders/`, payload)
  return res;
}