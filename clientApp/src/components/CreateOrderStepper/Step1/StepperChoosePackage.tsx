import React from 'react';
import Paper from '../../shared/Papper/Papper';
import './StepperChoosePackage.scss';
import packageIcon from '../../../images/CreateOrder/package.png';
import carIcon from '../../../images/CreateOrder/car.png'
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { PackageType, Package } from '../../../interfaces/models/package'
interface Props {
  next: (answer: Package | CarConfigurationType | null) => number
}

const StepperChoosePackage = ({ next }: Props) => {

  const handleCreatePackage = (packageType: PackageType) => {
    let chosenPackage:Package = {
      id: Date.now(),
      header: '',
      type: PackageType.SINGLE_CAR,
      price: 0,
      icon: 'public/images/packageIcons/car.png',
    }
    if(packageType === PackageType.SINGLE_CAR){
      chosenPackage.header = 'Single Car Review';
      chosenPackage.price = 200;
      chosenPackage.icon = '/images/packageIcons/car.png';
    }
    else {
      chosenPackage.type = PackageType.EXTENDED_PACKAGE;
      chosenPackage.header = 'Extended Review Car Plus';
      chosenPackage.icon = '/images/packageIcons/package.png';
      chosenPackage.price = 850;
    }

    next(chosenPackage)
  }


  return(
    <div className='choosePackage'>
      <Paper className='choosePackage-item' size='ml'>
        <div className='choosePackage-item-header'>
          Package
        </div>
        <div className='choosePackage-item-body'>
          <div className='choosePackage-item-body-image'>
            <img src={packageIcon}/>
          </div>
          <div className='choosePackage-item-body-description'>
          <p>Package is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley</p>
          </div>
          <div onClick={() => { handleCreatePackage(PackageType.EXTENDED_PACKAGE) }} className='choosePackage-item-body-button'>
            850 zl 
          </div>
        </div>
      </Paper>
      <Paper className='choosePackage-item' size='ml'>
        <div className='choosePackage-item-header'>
          Single
        </div>
        <div className='choosePackage-item-body'>
          <div className='choosePackage-item-body-image'>
          <img src={carIcon}/>
          </div>
          <div className='choosePackage-item-body-description'>
            <p>Single is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley</p>
          </div>
          <div className='choosePackage-item-body-button' onClick={() => {
            handleCreatePackage(PackageType.SINGLE_CAR)
            }}>200 zl</div>
        </div>
      </Paper>
    </div>
  )
}

export default StepperChoosePackage;