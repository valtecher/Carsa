import { CarBrandType as CarBrand, CarGenerationType, CarModelType } from "./generation";

export interface CarConfigurationType {
  id?: string; 
  CarBrand: CarBrand | string;
  CarModel: CarModelType | string;
  CarGeneration: CarGenerationType | string;
  year_from: number; 
  year_until: number;
  engine_volume_from: number; 
  engine_volume_until: number; 
  price_from: number; 
  price_until:number; 
  type: string; 
  transmission: string; 
  mileage_from: string;
  mileage_until: string; 
  location: string;
  fuel_type: string;
  drive: string;
  range?: string;
}