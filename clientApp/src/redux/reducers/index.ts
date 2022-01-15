import { combineReducers } from 'redux'
import { persistReducer  } from 'redux-persist'
import  storage  from 'redux-persist/lib/storage'
import authReducer from './auth'
import carReducer from './carReducer'
import orderReducer from './orderReducer'
import paymentsReducer from "./paymentsReducer";

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['auth']
}


const rootReducer = combineReducers({
  cars: carReducer,
  auth: authReducer,
  orders: orderReducer,
  payments: paymentsReducer,
})

export default persistReducer(persistConfig, rootReducer)
