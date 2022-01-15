import { from } from "rxjs"
import { switchMap, map } from 'rxjs/operators'
import axios from 'axios';
import {savePayments, GET_PAYMENTS_ATTEMP, SAVE_PAYMENTS, getPaymentsSuccess} from "../actions/paymentsActions";
import {ofType} from "redux-observable";
import { PaymentType } from "../../interfaces/models/payment";

export const getPaymentsEpic = (action$:any, state$:any) => action$.pipe(
    ofType(GET_PAYMENTS_ATTEMP),
    switchMap( action => from(axios.get(`${process.env.REACT_APP_API_URL}/payments/clientpayments`).then((res:any)=>{
        const payments:Array<PaymentType> = [];

        res.data.clientPayments.forEach((order:any) => {
         order.Payments.forEach((payment:PaymentType)=> {
            payments.push({...payment, orderSum: order.sum})
         })

        })

        console.log('Fetched payments', payments)

        return payments
    }))),
    map(savePayments)
) 

export const savePaymentsEpic = (action$:any, state$:any) => action$.pipe(
    ofType(SAVE_PAYMENTS),
    map(getPaymentsSuccess),
)