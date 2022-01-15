
import { OrderType as Order } from '../../interfaces/models/order';
import { GET_ORDER, GET_ORDER_SUCCEED, GET_ORDER_FAILED, SAVE_ORDER, SET_SELECTED_ORDER, DELETE_SELECTED_ORDER } from '../actions/orderActions';

interface initialState {
  isLoading: boolean,
  orders: Array<Order>,
  selectedOrder: Order | null, 
}

const initialState:initialState = {
  isLoading: false, 
  orders: [], 
  selectedOrder: null,
}

const orderReducer = (state = initialState, action:any) => {
  switch(action.type){
    case GET_ORDER: 
      return { ...state, isLoading: true }
    case SAVE_ORDER: 
      return { ...state, orders: action.payload, isLoading: false}
    case GET_ORDER_SUCCEED:
      return { ...state, isLoading: false }
    case SET_SELECTED_ORDER:
      return { ...state, selectedOrder: action.order }
    case DELETE_SELECTED_ORDER: 
      return {...state, selectedOrder: null}
    default: 
      return { ...state }
  }
}

export default orderReducer;