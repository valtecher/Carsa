import React, {useState, useEffect} from 'react'
import { CarType as Car, FlattenCar as FlattenCar }  from '../../interfaces/models/car'
import './CarDescription.scss'
import { carToFlatCar, } from '../../utils/carConventor'
import { Equipment } from '../../interfaces/equipment'

import { Parallax } from "react-scroll-parallax";
interface Props{
  car:Car | undefined | any
}

const CarDescription = ({car}:Props) => {

    console.log(car)

    const viewCar:FlattenCar | any = carToFlatCar(car || {})
    return(
      <Parallax y={[0, -20]}>
      <div className='CarDescriptionWrapper data-jarallax-element="1000 0" jarallax'>
         
          <div className='CarDescriptionWrapper-info'>
              <div className='CarDescriptionWrapper-info-item'>
                <div className='CarDescriptionWrapper-info-item-header'>
                  <h2>Specs</h2>
                </div>
                <div className='CarDescriptionWrapper-info-item-body'>
                    { Object.keys(viewCar || {}).filter((el)=>{return (el != 'id' && el != 'link' && el != 'mainImage' && el != 'images' && el != 'createdAt' && el != 'updatedAt' && el != 'EngineId' && el != 'Engine' && el!='equipment')}).map((key, index)=> {
                      
                      const value = viewCar[key]
                        return(
                          <div className='CarDescriptionWrapper-info-item-body-keyPair' key={index}>
                            {key + ':  ' + value.toString()}
                          </div>
                        )
                    })}
                </div>
              </div>
              <div className='CarDescriptionWrapper-info-item'>
                <div className='CarDescriptionWrapper-info-item-header'>
                  <h2>Description</h2>
                </div>
                <div className='CarDescriptionWrapper-info-item-body'>
                  {car?.description}
                </div>
                <div>
                  <button className='CarDescriptionWrapper-info-item-btn'>Show report</button>
                </div>
              </div>
          </div>
          <div className="CarDescriptionWrapper-equipment">
                <div className='CarDescriptionWrapper-info-item-header'>
                  <h2>Equipment</h2>
                </div>
                <div className='CarDescriptionWrapper-equipment-item-body'>
                 {car?.equipment.map((equipment:Equipment, index:number)=> {


                   return(
                     <div key={index} className='CarDescriptionWrapper-equipment-item-body-keyPair'>
                        {equipment.name}
                     </div>
                   )
                 })}
                </div>
          </div>
        
      </div>
      </Parallax>
    )
}

export default CarDescription
