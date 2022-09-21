export default interface ConfigurationType {
  id: string;
  order_id: string;
  brand_id?: string;
  model_id?: string;
  generation_id?: string;
  year_from?: number;
  year_until?: number;
  engine_volume_from?: number;
  engine_volume_until?: number;
  price_from?: number;
  price_until?: number;
  type?: string;
  transmission?: string;
  mileage_from?: number;
  mileage_until?: number;
  location_id?: string;
}
