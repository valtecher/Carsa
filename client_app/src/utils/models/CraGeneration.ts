export interface CarGenerationType{
  id?: string, 
  model_id: string, 
  name: string, 
  start_year: string,
  end_year: string,
  CarModel?: CarModelType,
}

export interface CarBrandType {
  id?: string; 
  name: string;

}

export interface CarModelType {
  CarBrand: CarBrandType, 
  id?: string; 
  name: string; 
  brand_id: string;

}