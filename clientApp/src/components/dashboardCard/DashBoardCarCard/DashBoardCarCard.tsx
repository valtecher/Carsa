import React, { useEffect, useState } from 'react'
import { CarType } from '../../../interfaces/models/car';
import './DashBoardCarCard.scss'

interface Props {
  car: CarType, 
  handleClick: (car:CarType) => void
}

const DashBoardCarCard = ({ car, handleClick }: Props) => {


  return(
    <div className='dashBoardcard-wrapper' onClick={()=>{ handleClick(car)}}>
      <div className='dashBoardcard-wrapper-orderId'>
        #{ car.id }
      </div>
      <div className='dashBoardcard-wrapper-status'>
       { car?.Car_Order?.status}
      </div>
      <div className='dashBoardcard-wrapper-row'>
        <div className='dashBoardcard-wrapper-carName'>
        { car?.CarGeneration?.CarModel?.CarBrand?.name } { car?.CarGeneration?.CarModel?.name }  { car?.CarGeneration?.name }
        <br/>
          <div className='dashBoardcard-wrapper-carDetails'>
          { car?.Engine?.fuel_type === 'Gasoline' ? 'PB' : 'ON'  } { car?.Engine?.volume } { car?.Engine?.name }  { car?.Engine?.power } Km { car?.drive } { car?.year } r
          </div>
        </div>
        <div className='dashBoardcard-wrapper-vin'>
          <p>{ car.vin }</p>
          <p>{ car.mileage } km</p>
        </div>
      </div>
    </div>
  )
};

export default DashBoardCarCard;