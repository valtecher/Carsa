import axios from 'axios';

export const fetchCarByLink = async (link:string) =>{

  return await axios.get(`${process.env.REACT_APP_API_URL}/cars/scrap`, { params: { link } }).then((res) => { 
    return res.data
  })
} 