import { CarBrandType } from "./CarBrand";
import { CarModelType } from "./CarModel";
import { CarGenerationType } from "./CraGeneration";
import { EngineType } from "./Engine";

export interface CarType {
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
  Engine: EngineType,
  CarBrand: CarBrandType,
  CarModel: CarModelType, 
  CarGeneration: CarGenerationType,
  images: Array<string>,
  fuel_type: string,
} 

export const dummyCar:CarType = {
  mainImage: "",
  description: "",
  brand: "Volkswagen",
  model: "Passat",
  generation: "b7",
  price: 54500,
  type: "Sedan",
  market: "",
  mileage: 129500,
  color: "Grey",
  drive: "Front",
  year: "2014",
  gearBox: "DSG",
  Engine: {
    name: 'tsi', 
    volume: '2000', 
    power: 211,
    fuel_type: 'Petrol'
  },
  CarBrand: {
    id: '1323',
    name: 'Volkswagen'
  },
  CarModel: {
    id: '532223',
    name: 'Passat',
  },
  CarGeneration: {
    model_id: '532223',
    id: '85674564',
    name: 'b7',
    start_year: '2012',
    end_year: '2016',
  },
  images: [],
  fuel_type: 'Petrol'
}