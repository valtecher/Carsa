import { Epic,  StateObservable } from "redux-observable"
import { from } from 'rxjs'
import { ofType} from "redux-observable"
import { GET_CAR_ATTEMPT, getCarSuccess, getCarFailed, saveCar, SAVE_CAR, UPDATE_CAR_ATTEMPT, UPDATE_CAR_SUCCESS, updateCarSuccess, updateCarFailed, GET_CAR_BRANDS_ATTEMPT, GET_CAR_CLIENT_ATTEMP } from "../actions/carActions"
import { switchMap, map } from 'rxjs/operators'
import axios from 'axios';
import { CarType as Car } from "../../interfaces/models/car"
import { carToFlatNaming } from '../../utils/carConventor';

export const saveCarsEpic = (action$:any, state$:any) => action$.pipe(
  ofType(SAVE_CAR),
  map(getCarSuccess)
)

export const getCarsEpic = (action$:any, state$:any) => action$.pipe(
  ofType(GET_CAR_ATTEMPT),
  switchMap(action => from(axios.get<Array<Car>>(`${process.env.REACT_APP_API_URL}/cars`).then((res)=>{
    const flattenCars: Array<Car> = [];
    [...res.data].forEach((car)=>{
      flattenCars.push(carToFlatNaming(car))
    })
    const brands = [...res.data || []].map((car:Car) => {
      return { id: car.CarGeneration.CarModel.CarBrand.id, name: car.CarGeneration.CarModel.CarBrand.name }
    })
    return {cars: flattenCars, brands }
  }).catch((err)=>{
    console.log(err)
    map(getCarFailed)
  }))),
  map(saveCar)
)

export const getCarClient = (action$:any, state$:any) => action$.pipe( 
  ofType(GET_CAR_CLIENT_ATTEMP),
  switchMap(action => from(axios.get<Array<Car>>(`${process.env.REACT_APP_API_URL}/cars/client`).then((res)=>{
    console.log(res);
    return res.data
  }))),
  map(saveCar)
)

export const updateCarEpic = (action$:any, state$:any) => action$.pipe(
  ofType(UPDATE_CAR_ATTEMPT),
  switchMap((action:any) => from(axios.put(`${process.env.REACT_APP_API_URL}/cars/${action.payload.id}`, {body: action.payload}).then((res)=> {
    return res.data
  }).catch((err)=>{
    console.log(err)
    map(updateCarFailed)
  }))),
  map(updateCarSuccess)
) 