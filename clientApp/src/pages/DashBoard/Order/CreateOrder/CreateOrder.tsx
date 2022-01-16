import React, { useState } from 'react';
// import AcceptTerms from '../../../../components/CreateOrderStepper/AcceptTerms/AcceptTerms'
import ChoosePackagePackage from '../../../../components/createOrderStepper/Step1/StepperChoosePackage';
import ConfigurationCreator from '../../../../components/createOrderStepper/LinkCreation/ConfigurationCreator';
import StripeContainer from '../../../../components/createOrderStepper/PaymentMethod/StripeContainer';
import './createOrder.scss'
import SideMenu from '../../../../components/sideMenu/SideMenu'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import { orderSteps } from './orderSteps'
// import  { handleRender } from '../../../../components/createOrderStepper/OptionRenderer/OptionRenderer'
import { CarConfigurationType } from '../../../../interfaces/models/carConfiguration'
import { PackageType, Package } from '../../../../interfaces/models/package'
import { CarType } from '../../../../interfaces/models/car';
import CheckIcon from '@mui/icons-material/Check';
interface Props {

}

interface StepperButtonsProps {
  currentStep: number,
  numberOfSteps: number
  next: (answer: any) => void,
  prev: () => void,
}
const handleRender = (activeStep:number, next: (answer: CarConfigurationType | Package  | null) => any, orderCreated: any) => {

    
  switch(activeStep){
    case 0:
      return(
        <ChoosePackagePackage next={next}/>
      )
    case 1: 
        return(
          <ConfigurationCreator type={orderCreated.package!.type}  next={next}></ConfigurationCreator>
        )
    case 2:
      return(
        <div></div>
          // <AcceptTerms next={next}/>
      )
    case 3: 
        return(  
          <StripeContainer selectedOptions={orderCreated} />
        )
    default:
      return(
        <div>
          
        </div>
      )
  }
}

const StepperButtons = ({ next, prev, currentStep, numberOfSteps }:StepperButtonsProps) => {

  return(
    <div className={'stepperButtons'}>
      <div className={`stepperButtons-button  ${ currentStep === 0 ? 'disabledStepBtn' : '' }`} onClick={prev}> Prev</div>

       <div className={`stepperButtons-button `} onClick={next}>{ currentStep != numberOfSteps - 1? 'Next' : <CheckIcon className='stepperButtons-button-icon'/>}</div>
    </div>
  )
}
interface Step{
  id: number,
  label: string,
}

const orderSteps:Array<Step> = [
  { id: 0, label: 'Choose package', },
  { id: 1, label: 'Add Your Specification', },
  { id: 2, label: 'Sign E-Contract and accept policies', },
  { id: 4, label: 'Summary', }
]

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