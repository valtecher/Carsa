import { PaymentType } from "../../interfaces/models/payment";
export const SAVE_PAYMENTS = 'SAVE_PAYMENTS';

export const GET_PAYMENTS_ATTEMP  = 'GET_PAYMENTS_ACTION';
export const GET_PAYEMNTS_SUCCESS = 'GET_PAYMENTS_SUCCESS';
export const GET_PAYMENT_FAILED = 'GET_PAYMENTS_FAILED'


export const SET_SELECTED_PAYEMNT = 'SET_SELECTED_PAYEMNT'
export const DELETE_SELECTED_PAYEMNT = 'DELETE_SELECTED_PAYEMNT'

export const getPaymentsAttemp = () =>{
  return {
    type: GET_PAYMENTS_ATTEMP
  }
}

export const getPaymentsSuccess = () => {
  return {
    type: GET_PAYEMNTS_SUCCESS
  }
}

export const getPaymentsFailed = () => {
  return {
    type: GET_PAYMENT_FAILED
  }
}

export const savePayments = (payments: Array<PaymentType>) => {
  return {
    type: SAVE_PAYMENTS, 
    payments
  }
}

export const setSelectedPayment = (payment:PaymentType) => {
  return {
    type: SET_SELECTED_PAYEMNT,
    payment
  }
}

export const deleteSelectedPayment = () => {
  return {
    type: DELETE_SELECTED_PAYEMNT,
    
  }
}