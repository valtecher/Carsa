import React, { useEffect, useState, } from 'react';
import Header from '../../components/header/Header';
import Paper from '../../components/Paper/Paper';
import './createOrder.scss';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { Button, StepLabel, Typography } from '@mui/material';
import ChooseOrderTypeStep, { PackageType } from './Steps/ChooseOrderTypeStep';
import AddCarConfiguration from '../CarSelector/AddCarConfiguration/AddCarConfiguration';
import ConfigurePaymentStep, { paymentFormFields } from './Steps/PaymentStep';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../utils/apis/OrderApi';

const steps = ['Select order type', 'Add Configuration or Car', 'Payment'];

const CreateOrder = () => {
  
  const [ selectedOptions, setSelectedOptions ] = useState<any>({});
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const handleOptionSelection = (selectedOption: any) => {
    setSelectedOptions({...selectedOptions, ['step'+activeStep]:  selectedOption});
    handleNext();
  }

  const isStepOptional = (step: number) => {
    return false;
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleSubmit = (paymentForm: paymentFormFields) => {
    createOrder({ ...selectedOptions, paymentForm }).then((res:any) => {
      navigate('/home');
    })
    
  }

  return (
    <div>
      <Header/>
        <div className='createOrder'>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            
              <React.Fragment>
              <div className='createOrder'>
                { activeStep === 0? <ChooseOrderTypeStep selectOption={handleOptionSelection}/> :  ''}
                { activeStep === 1? selectedOptions.step0 === PackageType.Single ? <AddCarConfiguration mode={false} onSubmit={handleOptionSelection}/> : 'This is package'  : ''}
                { activeStep === 2?  <ConfigurePaymentStep submit={handleSubmit} sum={selectedOptions.step0 === 'Single'  ? 200 : 800 }/> :  ''}
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                { activeStep !== 1? 
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? '' : 'Next'}
                </Button> : ''} 
              </Box>
              </React.Fragment>
          </Box>
      </div>
    </div>
  );
}

export default CreateOrder