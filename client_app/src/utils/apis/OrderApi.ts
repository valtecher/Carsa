import axios from 'axios';
import { manualConfiguration } from '../../pages/CarSelector/AddCarConfiguration/AddCarConfiguration';
import { CarType, dummyCar } from '../models/Car';
import { IConfiguration } from '../models/OrderWithConfiguration';

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

export const addCarToConfiguration = (car: manualConfiguration | CarType) => {
  axios.post('', { body: car }).then((res) => { return res;  }).catch((e) => {console.log(e);})
}
