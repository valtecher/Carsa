import moment from 'moment';
import React, { useState } from 'react';
import Button from '../../../components/common/button/Button';
import TextInput from '../../../components/common/input/TextInput';
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

const defaultFormFieldsState:paymentFormFields = {
  name: '',
  surname: '',
  cardNumber: '',
  validDate: '',
  cvc: ''
}

const ConfigurePaymentStep = ({ sum , submit}: IConfigurePaymentStepProps) => {

  const [ formFields, setFormFields ] = useState<paymentFormFields>(defaultFormFieldsState);
  const [ errorState, setErrorState ] = useState<paymentFormFields>(defaultFormFieldsState);

  const handleChange = (e:any) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  }

  console.log('Error state', errorState);
  const handleSubmit = (e:any) => {
    setErrorState({...defaultFormFieldsState})

    if(formFields){
      if(formFields?.cvc?.length > 3){
        const cvcError = 'Cvc is too long';
        setErrorState({ ...errorState, cvc: cvcError })
        // alert(cvcError);
      } else { 
        setErrorState({ ...errorState, cvc: '' })
      }

      if(moment(formFields?.validDate, 'DD/MM/YYYY').isBefore(moment())){
        const dateError = 'Wrong date';
 
        setErrorState({ ...errorState, validDate: dateError })
        // alert(dateError);
      } else { 
        setErrorState({ ...errorState, validDate: '' })
      }

      if(formFields?.cardNumber?.length !== 16){
        const cardNumberError = 'Card Number is not valid';
        setErrorState({ ...errorState, cardNumber: cardNumberError })
        // alert(cardNumberError);
      } else { 
        setErrorState({ ...errorState, cardNumber: '' })
      }

    }
    if(Object.values(errorState).every((el) => el === '')) {
      submit(formFields);
    }
  }

  return (
    <div className='paymentStep'>
      <div className='paymentStep-decoration'></div>
      <div className='paymentStep-content'>
        <p className='main-info-text'>Sum { sum }</p>
        <div className='paymentStep-content-card'>
          <div>
            <TextInput name='name' onChange={handleChange} value={formFields?.name} placeholder='Name'></TextInput>
            <TextInput name='surname' onChange={handleChange} value={formFields?.surname} placeholder='Surname'></TextInput>
            <TextInput error={errorState.cardNumber !== ''? errorState.cardNumber : ''} name='cardNumber' onChange={handleChange} value={formFields?.cardNumber} placeholder='Card Number'></TextInput>
            <TextInput error={errorState.validDate !== ''? errorState.validDate : ''} name='validDate' onChange={handleChange} value={formFields?.validDate} placeholder='Valid Date'></TextInput>
            <TextInput error={errorState.cvc !== ''? errorState.cvc : ''} name='cvc' onChange={handleChange} value={formFields?.cvc} placeholder='CVC'></TextInput>
          </div>
          <div></div>
          <Button className='paymentStep-submit' onClick={handleSubmit} type={true} name={'Pay'} ></Button>
        </div>
      </div>
    </div>
  )
};

export default ConfigurePaymentStep;