import axios from 'axios';
import { manualConfiguration } from '../../pages/CarSelector/AddCarConfiguration/AddCarConfiguration';
import { uuid } from '../helpers/uuid';
import { CarType, dummyCar } from '../models/Car';
import { OrderType } from '../models/Order';
import { IConfiguration } from '../models/OrderWithConfiguration';
import { IReport } from '../models/Report';

export const getOrderbyDetails = async (orderId: string) => {
  const order = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, { withCredentials: true });
   return order;

}

export const getLastOrders = async (client_id:string) => {  
    const orders = await retrieveAllClientOrders(client_id);
    return { ...orders }
}


export const addCarToConfiguration = async (car: manualConfiguration | CarType | null | undefined) => {
  return axios.post('', { body: car }).then((res) => { return res;  }).catch((e) => {console.error(e);})
}

export const addReportToConfiguration = async (report:any) => {
  return axios.post('', { report }).then((res) => {return res.data}).catch((e) => {
    console.error('something went wrong:', e)
  });
}

export const editReport = async (updatedReport:any) => {
  return axios.put('', { report: updatedReport }).then((res) => {return res.data}).catch((e) => {
    console.error('Something went wrong: ', e)
  });
}

export const createOrder = async (dataSet:any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/orders`, {...dataSet})
}

export const retrieveAllClientOrders = async (clientId:string) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/orders/client/${clientId}`);
}
