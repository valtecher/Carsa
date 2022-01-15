import React, { useState } from 'react'
import './CreateOrder.scss'
import SideMenu from '../../../../components/sideMenu/SideMenu'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { orderSteps } from './OrderSteps'
import StepperButtons from '../StepperButtons/StepperButtons';
import  { handleRender } from '../../../../components/createOrderStepper/OptionRenderer/OptionRenderer'
import { CarConfigurationType } from '../../../../interfaces/models/carConfiguration'
import { PackageType, Package } from '../../../../interfaces/models/package'
import { CarType } from '../../../../interfaces/models/car';

interface Props {

}

export interface SelectedOptionType {
  package:   Package | null
  configuration: CarConfigurationType | CarType | null
}

const CreateOrder = (props:Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [ orderCreated, setCreatedOrder ] = useState<SelectedOptionType>({ package: null, configuration: null, });

  const handleStepNext = (answer: PackageType | Package | CarConfigurationType | CarType  |  null):any => {
    if(activeStep !== orderSteps.length -1){
      setActiveStep(activeStep + 1)
    }
    if(activeStep === 0){ 
      setCreatedOrder({ ...orderCreated, package: answer as Package })
    }
    if ( activeStep === 1 ) {
      setCreatedOrder({ ...orderCreated, configuration: answer as CarConfigurationType | CarType  })
    }
  }

  const handleStepPrev = () => {
    if(activeStep !== 0 ) {
      setActiveStep(activeStep - 1);  
    }
  }
  
  return(
    <div>
      <SideMenu/>
      <div className='createOrder'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {orderSteps.map((step) => (
            <Step key={step.label}>
              <StepLabel className='createOrder-stepper-label' onClick={()=> {  setActiveStep(step.id) }}>
                <p> {step.label} </p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className='createOrder-body'>
          { handleRender(activeStep, handleStepNext, orderCreated) }
        </div>
        { (activeStep !== 0 && activeStep !== 1 && activeStep !== 2 && activeStep !== 3)? <div className='createOrder-buttons'>
        <StepperButtons currentStep={activeStep} numberOfSteps={orderSteps.length} next={handleStepNext} prev={handleStepPrev} />
        </div> : ''  }
      </div>
    </div>
  )
}

export default CreateOrder