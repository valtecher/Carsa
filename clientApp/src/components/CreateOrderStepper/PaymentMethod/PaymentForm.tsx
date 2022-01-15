// @ts-nocheck
import React, { useState } from 'react'
import './StripeContainer.scss';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import packageIcon from '../../../images/CreateOrder/package.png';
import carIcon from '../../../images/CreateOrder/car.png';
import visaLogo from '../../../images/CreateOrder/visaLogo.png';
import { CARD_OPTIONS } from './paymentOptions';
import Paper from '../../shared/Papper/Papper';
import AppleIcon from '@mui/icons-material/Apple';
import MemoryIcon from '@mui/icons-material/Memory';
import { useHistory } from 'react-router-dom';
import { postStripePayment } from '../../../services/stripe/stripeService'
import { createOrderOnServer } from '../../../services/order/orderService'
import { useSelector } from 'react-redux'
import { storeState } from '../../../redux/store';


interface Props {
  selectedOptions: SelectedOptionType
}

const PaymentForm = ({ selectedOptions }:Props) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [ success, setSuccess ] = useState(false);
  const history = useHistory();
  const client = useSelector((state: storeState) => state.auth.user)

  const handleSubmit = async (event:any) => {
    event.preventDefault();
      // @ts-ignore 
      const { error, paymentMethod } = await stripe?.createPaymentMethod({
        type: 'card',
        // @ts-ignore 
        card: elements?.getElement(CardElement)
      })

      if(!error){
        try{
          const { id } = paymentMethod;

          const response:any = await postStripePayment(selectedOptions.package.price, id)

          if(response.data.success){
            console.log('Successful payment');
            setSuccess(true);

            createOrderOnServer({...selectedOptions, client }).then((res:any) => {
              console.log(res);
              history.push('/dashboard');
            });
            
          }

        } catch(err){
            console.log('Error', err)
        }
      } else {
        console.log(error.message)  
      }
  }


console.log(selectedOptions)


  return(
    <div className='paymentForm'>
      <div className='paymentForm-summary'>
        <div className='paymentForm-summary-logo'>
          <div>Bitok</div>
          <div className='paymentForm-summary-header'>{ selectedOptions.package.header }</div>
        </div>
        <img src={selectedOptions.package.icon}></img>
        <div className='paymentForm-summary-total' >Total: { selectedOptions.package.price } ZL</div>
      </div>
      <div className='paymentForm-body'>
        { !success? 
        <div>
           <Paper className='paymentForm-body-card' size='card'>
             <img className='visaLogo' src={visaLogo}></img>
             <MemoryIcon className='chipLogo' fontSize='large'/>
              <form onSubmit={handleSubmit}>
                <fieldset className='FormGroup'>
                      <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                      </div>
                    </fieldset>
                  <button className='paymentForm-body-card-pay'>Pay</button>
                </form>
           </Paper>
           <div className='paymentForm-applePay'> Checkout with Apple Pay  <AppleIcon className='appleIcon' fontSize='large'/></div>

          </div>
         :
        <div className='paymentForm-success'>Your payment was successful, and your order has been created!</div>
        }
      </div>
    
    </div>
  )
}

export default PaymentForm
