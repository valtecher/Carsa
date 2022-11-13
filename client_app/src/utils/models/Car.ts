import { CarBrandType } from "./CarBrand";
import { CarModelType } from "./CarModel";
import { CarStateReport } from "./CarStateReport";
import { CarGenerationType } from "./CraGeneration";
import { EngineType } from "./Engine";
import { IReportOverview } from "./ReportOverrview";

export interface CarType {
  id?:string,
  mainImage:string,
  description:string,
  brand:string, 
  model:string, 
  generation:string,
  registrationNumber?:string, 
  vin?:string,
  price:number,
  type:string, 
  market:string,
  link?:string, 
  mileage:number,
  color:string, 
  drive:string,
  year:string, 
  images: Array<string>,
  fuel_type: string,
  state?: CarStateReport, 
  gearBox:string,
  Engine: EngineType,
  CarBrand: CarBrandType,
  CarModel: CarModelType, 
  CarGeneration: CarGenerationType,
  ReportOverviews?: Array<IReportOverview>,
  [key: string]: any

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
  registrationNumber: 'KR4321MV',
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
  fuel_type: 'Petrol',
  vin: 'hwy23487234810831g139123d',
  state: {
    exterior: { 
      state: 90,
    },
    interior: { 
      state: 90,
    },
    suspension: { 
      state: 90,
    },
    engine: { 
      state: 90,
    },
    gearbox: {
      state: 90,
    }
  }, 
}

export const dummyCarWithImages:CarType = {
  id: '#25353123098',
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
  registrationNumber: 'KR4321MV',
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
  images: ['https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImduZXdvYmhydGxsbjMtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.Tmc55HCxNRGGgdTkx7jatiWUcjxW28fPjPGevUqsfBo/image;s=1080x720', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjgyZjk5ZnhlNDhxbTEtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.gNA6Iso37ePoW0x_0MOwRmHGf9jqAe0AwHTB0DggPmg/image;s=1080x720', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6InpmeGM0ZXlxbWNkZjMtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.pmKekUjkJoeuInlGUN7ahJzzZz6556jvT58LrhM2zaM/image;s=1080x720', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjJpdHlqdDdveW5jZjMtT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.9g68mBGuMPNJZ5Iw_5lhCkIDMiwApPe4U5AYCbb22CA/image;s=1080x720', 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Ijhuc3ppdGFvMnExbTItT1RPTU9UT1BMIiwidyI6W3siZm4iOiJ3ZzRnbnFwNnkxZi1PVE9NT1RPUEwiLCJzIjoiMTYiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.9P-vkF-aa1bZMam5yg57rIVzc_9Qrw9pdRCxZl768mk/image;s=1080x720'],
  fuel_type: 'Petrol',
  vin: 'hwy23487234810831g139123d',
  state: {
    exterior: { 
      state: 90,
    },
    interior: { 
      state: 90,
    },
    suspension: { 
      state: 90,
    },
    engine: { 
      state: 90,
    },
    gearbox: {
      state: 90,
    }
  }, 
}