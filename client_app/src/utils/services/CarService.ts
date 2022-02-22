import axios from 'axios';

export const getAllBrands = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/brands`).then((res:any) => {
    return res.data;
  });
}

export const getAllModels = (brand_name: string) => {
   return axios.get(`${process.env.REACT_APP_API_URL}/cars/models`, {  headers: {
    'brand_name': brand_name
  }});
}

export const getAllGenerations = (model_name: string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cars/generations`, {
    headers: {
      'model_name': model_name,
    }
  })
}

export const getAllCars = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/cars`)
}

export const filterCars = (filters:any) => {
  axios.post(`${process.env.REACT_APP_API_URL}/cars/filter`, filters)
}