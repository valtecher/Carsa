import axios from 'axios';



export const createOrderOnServer = async (payload:any) => {
  const res = await axios.post('http://localhost:3000/api/orders/', payload)
  return res;
}