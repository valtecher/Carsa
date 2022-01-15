import React from 'react';
import { CarType } from '../../interfaces/models/car';

interface Props {
  car: CarType
}

const CarSpecPresentation = ({car}:Props) => {

  return(
    <div className='dashBoardInfo-wrapper-body-part-body'>
      { Object.entries(car || {}).map((entry:any) => {
                      if((typeof entry[1] !== 'object')) {
                        if( entry[0] !== 'description' && entry[0] !== 'updatedAt' && entry[0] !== 'createdAt' && entry[0] !== 'mainImage'){
                          return(
                            <div className='dashBoardInfo-wrapper-body-part-body-item'>
                              <p className='dashBoardInfo-wrapper-body-part-body-item-key'>{ entry[0] }:</p>
                              <p className='dashBoardInfo-wrapper-body-part-body-item-value'>{ entry[1] }</p>
                            </div>
                          )
                        }
                      } else {
                        const subArray = Object.entries(entry[1] || {});
                        if(entry[0] === 'Engine' || entry[0] === 'Car_Order'){
                          return(
                            <div className='dashBoardInfo-wrapper-body-part-body-item'>
                              <p className='dashBoardInfo-wrapper-body-part-body-item-key'>{ entry[0] }: </p>
                              <div className='dashBoardInfo-wrapper-body-part-body-subView'> { [...subArray || []].map((entry:any)=>{
                                if( entry[0] !== 'createdAt' &&  entry[0] !== 'updatedAt' && entry[0] !== 'updatedAt'){
                                  return(
                                    <div className='dashBoardInfo-wrapper-body-part-body-subItem'>
                                    <p className='dashBoardInfo-wrapper-body-part-body-item-key'>{ entry[0] }:</p>
                                    <p className='dashBoardInfo-wrapper-body-part-body-item-value'>{ entry[1] === 'createdAt' ? 'hi' : entry[1] }</p>
                                  </div>
                                  )
                                }
                                
                                })}  
                              </div>
                          </div>
                          )
                        }
                      
                      }
                    }) }
    </div>
  )
}

export default CarSpecPresentation;