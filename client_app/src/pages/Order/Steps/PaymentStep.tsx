import { useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../components/common/button/Button';
import TextInput from '../../../components/common/input/TextInput';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import './chooseOrderType.scss';

interface IConfigurePaymentStepProps {
  sum: number;
  submit: (formFields: paymentFormFields) => void
}

export interface paymentFormFields {
  name: string, 
  surname: string,
  cardNumber: string, 
  validDate: string, 
  cvc: string,
}


const ConfigurePaymentStep = ({ sum , submit}: IConfigurePaymentStepProps) => {

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
     alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='paymentStep'>
      <div className='paymentStep-decoration'></div>
      <div className='paymentStep-content'>
        <p className='main-info-text'>Sum { sum }</p>

      </div>
    </div>
  )
};

export default ConfigurePaymentStep;