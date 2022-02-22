import { CarBrandType } from "./CarBrand";
import { CarModelType } from "./CarModel";
import { CarGenerationType } from "./CraGeneration";
import { EngineType } from "./Engine";

export interface CarType {
  id?:string,
  // Car_Order?: Car_Order_Type, 
  mainImage:string,
  description:string,
  brand:string, 
  model:string, 
  generation:string, 
  vin?:string,
  price:number,
  type:string, 
  market:string,
  link?:string, 
  mileage:number,
  color:string, 
  drive:string,
  year:string, 
  gearBox:string,
  Engine: EngineType,
  CarBrand: CarBrandType,
  CarModel: CarModelType, 
  CarGeneration: CarGenerationType,
  images: Array<string>,
  fuel_type: string,
  // equipment: Array<Equipment>,
  // ReportOverviews?: Array<ReportOverview>,
} 