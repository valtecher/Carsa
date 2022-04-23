export interface EngineType{
  id?:string,
  name:string,
  volume:string, 
  power:number, 
  fuel_type:string,
}
export interface IEngine {
  id: string, 
  power: string, 
  volume: string, 
  name?: string,
  code?: string, 
  fuel?: string,
}
