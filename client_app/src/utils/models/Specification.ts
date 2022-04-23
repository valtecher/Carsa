import { IEngine } from "./Engine";

export interface ISpecification {
  id: string,
  brand: string, 
  model: string, 
  generation: string,
  year: string,
  doors?: string,
  engine?: IEngine,
  color?: Array<string> | string, 
  gearbox?: string,
}