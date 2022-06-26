export interface CarType {
  id: string;
  color: string;
  vin?: string;
  registrationNumber?: string;
  description?: string;
  mileage: number;
  year: number;
  drive: string;
  transmission: string;
  market_name?: string;
  marketplace_link?: string;
  price: string;
  type: string;
  brand_id: string;
  model_id: string;
  generation_id?: string;
  engine_id: string;
  location_id: string;
  mainImage?: string;
  images?: Array<string>;
}
