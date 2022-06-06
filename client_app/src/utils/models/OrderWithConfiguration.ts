import { ISpecification } from "./Specification";
import { IClient } from "./Client";
import { CarType } from "./Car";
export interface IConfiguration {
  id: string,
  type: string, 
  specs?: ISpecification,
  client?: IClient,
  cars?: Array<CarType>,
}