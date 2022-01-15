import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm';
import './StripeContainer.scss';
import { SelectedOptionType } from '../../../pages/DashBoard/Order/CreateOrder/CreateOrder';

const PUBLIC_KEY = 'pk_test_51KDrBrGxy8KyVn0kErBbNTcBxXzZ0MUFsLsM5ufta0diL4kNzxiyffQt9R9at2EJ6wfZyu15mY9VNfCAiEQmuuij006kcZMyOM'

const stripePromise = loadStripe(PUBLIC_KEY)

interface Props {
  selectedOptions: SelectedOptionType
}

const StripeContainer = ({ selectedOptions }: Props) => {


  return(
    <div className='stripeContainer'>
      <Elements stripe={stripePromise}>
          <PaymentForm selectedOptions={selectedOptions} />
      </Elements>
    </div>
  ) 
}

export default StripeContainer;