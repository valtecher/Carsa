import moment from 'moment';

export interface IPayment {
  id: string; 
  sum: number;
  order_id:  string; 
  date: string; 
  amount: number;
}

export const dummyPayment:IPayment = {
  id: "test",
  sum: 200,
  order_id: "test_order",
  date: Date.now().toLocaleString(),
  amount: 150,
}