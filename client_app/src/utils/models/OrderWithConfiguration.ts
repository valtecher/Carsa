import { ISpecification } from "./Specification";
import { IClient } from "./Client";
export interface IConfiguration {
  id: string,
  type: string, 
  specs?: ISpecification,
  client?: IClient,
}