import React, { useState } from 'react';
import AcceptTerms from '../acceptterms/acceptTerms';
import ChoosePackagePackage from '../step1/StepperChoosePackage'
import ConfigurationCreator from '../linkcreation/ConfigurationCreator';
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { Package } from '../../../interfaces/models/package';
import StripeContainer from '../paymentmethod/StripeContainer';
// import { SelectedOptionType } from '../../../pages/DashBoard/Order/CreateOrder/createOrder';


export const handleRender = (activeStep:number, next: (answer: CarConfigurationType | Package  | null) => any, orderCreated: any) => {

    
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
          <AcceptTerms next={next}/>
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