import React from 'react';
import './StepperButtons.scss'
import CheckIcon from '@mui/icons-material/Check';

interface Props {
  currentStep: number,
  numberOfSteps: number
  next: (answer: any) => void,
  prev: () => void,
}

const StepperButtons = ({ next, prev, currentStep, numberOfSteps }:Props) => {

  return(
    <div className={'stepperButtons'}>
      <div className={`stepperButtons-button  ${ currentStep === 0 ? 'disabledStepBtn' : '' }`} onClick={prev}> Prev</div>

       <div className={`stepperButtons-button `} onClick={next}>{ currentStep != numberOfSteps - 1? 'Next' : <CheckIcon className='stepperButtons-button-icon'/>}</div>
    </div>
  )
}

export default StepperButtons