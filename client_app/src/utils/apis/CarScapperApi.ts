import axios from 'axios';
import { dummyCar, dummyCarWithImages } from '../models/Car';

export const fetchCarByLink = async (link:string) =>{
  if (link === 'test'){
    return dummyCarWithImages
  }

  return await axios.get(link).then((res) => { 
    return res.data
  })
} 