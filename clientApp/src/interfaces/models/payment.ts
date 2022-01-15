import { OrderType } from "./order";


export interface CashPayment {
  id: string; 
  
}

export interface CardPayment {
  id: string;
  card_number: string; 
  ownerName: string;
}

export interface PaymentType {
  id: string; 
  date: Date; 
  amount: number; 
  order_id: string;
  Order?: OrderType;
  orderSum:number; 
  CashPayment: CashPayment | null | undefined;
  CardPayment: CardPayment | null | undefined;  

}