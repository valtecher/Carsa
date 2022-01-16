import axios from 'axios';

export const postStripePayment = async (amount:number, id:any) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/stripe`, { amount, id })
  return res;
}