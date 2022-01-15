import axios from 'axios';

export const postStripePayment = async (amount:number, id:any) => {
  const res = await axios.post('http://localhost:3000/api/stripe', { amount, id })
  return res;
}