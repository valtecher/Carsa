import { ClientType as Client } from "./client";
import { ManagerType as Manager } from "./manager";
import { PaymentType as Payment } from "./payment";
import { CarType as Car } from "./car";
import { CarConfigurationType as CarConfiguration } from "./carConfiguration";
export interface OrderType {
  id: string; 
  date: Date;
  status: string; 
  Client: Client;
  Manager: Manager;
  Paymnets: Array<Payment>;
  cars: Array<Car>;
  order_configuration: Array<CarConfiguration>;
  sum: number;
}