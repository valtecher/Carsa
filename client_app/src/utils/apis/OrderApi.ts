import axios from 'axios';
import { manualConfiguration } from '../../pages/CarSelector/AddCarConfiguration/AddCarConfiguration';
import { CarType, dummyCar } from '../models/Car';
import { IConfiguration } from '../models/OrderWithConfiguration';
import { IReport } from '../models/Report';

export const getOrderbyDetails = async (orderId: string) => {
  if(orderId === 'test') {
    const configuration: IConfiguration = {
      id: '#000123123123',
      type: 'configuration',
      specs: {
        id: '#12312',
        brand: 'Volkswagen',
        model: 'Passat',
        generation: 'b7', 
        year: '2012-2015', 
        color: 'Silver',
        price: '35000-62500',
        engine: {
          id: '#8008123',
          name: 'TSI',
          power: '150-', 
          volume: '1700-'
        } 
      },
      client: {
        id: '#98970028',
        name: 'Dawid',
        surName: 'Milyi'
      }, 
      cars: [
        dummyCar, dummyCar, dummyCar,dummyCar,dummyCar,dummyCar
      ]
    }
    const res = {
     data: configuration
    }
    return res
  } else {
   const order = await axios.get(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, { withCredentials: true });
   return order;
  }
}

export const getLastOrders = async () => {
    const configuration: IConfiguration = {
      id: '#000123123123',
      type: 'configuration',
      specs: {
        id: '#12312',
        brand: 'Volkswagen',
        model: 'Passat',
        generation: 'b7', 
        year: '2012-2015', 
        color: 'Silver',
        price: '35000-62500',
        engine: {
          id: '#8008123',
          name: 'TSI',
          power: '150-', 
          volume: '1700-'
        } 
      },
      client: {
        id: '#98970028',
        name: 'Dawid',
        surName: 'Milyi'
      }, 
      cars: [
        dummyCar, dummyCar, dummyCar,dummyCar,dummyCar,dummyCar
      ]
    }
    return { data: [configuration, configuration] }
  }


export const addCarToConfiguration = async (car: manualConfiguration | CarType) => {
  axios.post('', { body: car }).then((res) => { return res;  }).catch((e) => {console.log(e);})
}

export const addReportToConfiguration = async (report:IReport) => {
  axios.post('', { report }).then((res) => {return res.data}).catch((e) => {
    console.log('something went wrong:', e)
  });
}

export const editReport = async (updatedReport:IReport) => {
  axios.put('', { report: updatedReport }).then((res) => {return res.data}).catch((e) => {
    console.log('Something went wrong: ', e)
  });
}

export const createOrder = async (dataSet:any) => {
  axios.post('', {...dataSet})
}