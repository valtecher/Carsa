import { PaymentType } from "../../interfaces/models/payment";
import {GET_PAYEMNTS_SUCCESS, GET_PAYMENT_FAILED, GET_PAYMENTS_ATTEMP, SAVE_PAYMENTS, SET_SELECTED_PAYEMNT, DELETE_SELECTED_PAYEMNT} from "../actions/paymentsActions";

export interface initialState {
  isLoading: boolean;
  payments: Array<PaymentType>;
  selectedPayment: PaymentType | null;
}

const initialState:initialState = {
  isLoading: false,
  payments: [],
  selectedPayment: null,
}

const paymentsReducer = (state = initialState, action:any) => {
  switch(action.type){
    case SAVE_PAYMENTS:
      return {...state, payments: [...action.payments || []]}
    case GET_PAYMENTS_ATTEMP:
        return { ...state, isLoading: true }
    case GET_PAYEMNTS_SUCCESS:
      return { ...state, isLoading: false }
    case GET_PAYMENT_FAILED:
      return { ...state, isLoading: false }
    case SET_SELECTED_PAYEMNT: 
      return {...state, selectedPayment: action.payment}
    case DELETE_SELECTED_PAYEMNT:
        return { ...state, selectedPayment: null } 
    default: 
      return { ...state }
  }


}

export default paymentsReducer;