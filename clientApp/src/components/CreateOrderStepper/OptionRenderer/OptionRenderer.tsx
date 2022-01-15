import React, { useState } from 'react';
import AcceptTerms from '../AcceptTerms/AcceptTerms';
import ChoosePackagePackage from '../Step1/StepperChoosePackage'
import ConfigurationCreator from '../LinkCreation/ConfigurationCreator';
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { Package, PackageType } from '../../../interfaces/models/package';
import StripeContainer from '../PaymentMethod/StripeContainer';
import { CarType } from '../../../interfaces/models/car';
import { SelectedOptionType } from '../../../pages/DashBoard/Order/CreateOrder/CreateOrder';


export const handleRender = (activeStep:number, next: (answer: CarConfigurationType | Package  | null) => any, orderCreated: SelectedOptionType) => {

    
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