import { CarType as Car } from '../../interfaces/models/car'
import { DELETE_SELECTEDCAR, GET_CAR_ATTEMPT, GET_CAR_CLIENT_ATTEMP, GET_CAR_FAILED, GET_CAR_SUCCESS, SAVE_CAR, SET_SELECTEDCAR } from '../actions/carActions'
import { CarBrandType, CarModelType, CarGenerationType } from '../../interfaces/models/generation'
interface carReducerInitialState{
  isLoading: boolean
  cars: Array<Car>,
  brands: Array<CarBrandType>
  selectedCar: Car | null,
}

const initialState:carReducerInitialState = {
  isLoading: false,
  cars: [], 
  brands: [], 
  selectedCar: null,
}

const carReducer = (state = initialState, action:any) => {
  
  switch(action.type){
    case SAVE_CAR: 
      return {...state, cars: [...action.payload?.cars || []], brands: [...action.payload?.brands || []]}
    case GET_CAR_ATTEMPT:
      return {...state, isLoading: true}
    case GET_CAR_SUCCESS: 
      return {...state, isLoading: false}
    case GET_CAR_FAILED: 
      return {...state, isLoading:false}
    case GET_CAR_CLIENT_ATTEMP: 
      return {...state, isLoading: true }
    case DELETE_SELECTEDCAR: 
      return { ...state, selectedCar: null }
    case SET_SELECTEDCAR: 
      return { ...state, selectedCar: action.car }
    default: return state
  }

}

export default carReducer