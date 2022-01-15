import { Equipment } from "../equipment";
import engine from "./engine";
import { CarGenerationType } from "./generation";
import { ReportOverview } from "./reportOverView";
import { Car_Order_Type } from "./car_order";

export interface CarType {
  id?:string,
  Car_Order?: Car_Order_Type, 
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
  Engine: engine,
  CarGeneration: CarGenerationType,
  images: Array<string>,
  equipment: Array<Equipment>
  ReportOverviews?: Array<ReportOverview>;
  
}
export interface CarDashboardPresentationType {
  numberPlate: string; 
  vin: string;
  brand: string; 
  model: string;
  generation: string; 
  owner: string; 
  report: {
    interior: number;
    outside: number; 
    engine: number; 
    suspension: number; 
  }
}

export interface FlattenCar {
  id?:string,
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
  yearFrom: string,
  images: Array<string>,
  EngineName: string,
  EngineVolume: string, 
  EnginePetrol: string,
  EnginePower: string,
  
}

// export interface CarDashBoardType extends CarType {
//   Car_Order: Car_Order_Type;
// }




