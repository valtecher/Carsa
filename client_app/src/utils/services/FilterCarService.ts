import { CarType } from "../models/Car";

export const filterCar = (car:CarType, filter:any): boolean => {
  let flag = true;

  if( filter.type ){
    if(car.type !== filter.type){
      flag = false
    }
  } 

  if(filter.brand){
    if(car.CarBrand.name !== filter.brand){
      flag = false
    }
  }

  if(filter.model){
    if(car.CarModel.name !== filter.model){
      flag = false
    }
  }
  if(filter.generation){
    if(car.CarGeneration.name !== filter.brand){
      flag = false
    }
  }
  if(filter.fuelType){
    if(car.fuel_type !== filter.brand){
      flag = false
    }
  }

  if( filter.priceuntil ){
    if(car.price > filter.priceuntil){
      flag = false
    }
  }

  if( filter.pricefrom ) {
    if(car.price < filter.pricefrom){
      flag = false
    }
  }
  if(filter.milagefrom) {
    if(car.mileage > filter.milagefrom){
      flag = false
    }
  }
  if(filter.milageuntil){
    if(car.mileage > filter.milageuntil){
      flag = false
    }
  }
  if(filter.yearfrom) {
    if(car.year < filter.yearfrom){
      flag = false
    }
  }

  if(filter.yearuntil){
    if(car.year > filter.yearuntil){
      flag = false
    }
  }
  if(filter.powerfrom){
    if(car.Engine.power < filter.powerfrom){
      flag = false
    }
  }

  if(filter.poweruntil){
    if(car.Engine.power > filter.poweruntil){
      flag = false
    }
  }

  return flag;
}