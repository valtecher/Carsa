import { Epic,  StateObservable } from "redux-observable"
import { from } from 'rxjs'
import { ofType} from "redux-observable"
import { switchMap, map } from 'rxjs/operators'
import axios, { AxiosResponse } from 'axios';
import { getOrderSuccess, GET_ORDER, GET_ORDER_SUCCEED, SAVE_ORDER, saveOrder } from '../actions/orderActions'

export const saveOrderEpic = (action$:any, state$:any) => action$.pipe(
  ofType(SAVE_ORDER),
  map(getOrderSuccess)
)

export const getOrderEpic = (action$:any, state$:any) => action$.pipe(
  ofType(GET_ORDER),
  switchMap( action => from(axios.get('http://localhost:3000/api/orders/detailed').then((res:any)=>{
    console.log(res.data)
    return res.data
  }))),
  map(saveOrder)
)
