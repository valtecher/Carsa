import { ISpecification } from "./Specification";
import { IClient } from "./Client";
import { CarType } from "./Car";
export interface IConfiguration {
  id: string,
  type: string, 
  Configurations?: Array<ISpecification>,
  Client?: IClient,
  OrderCars?: Array<CarType>,
}