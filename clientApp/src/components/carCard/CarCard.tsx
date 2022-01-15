import axios from 'axios'
import React from 'react'
import './carCard.scss'
import { CarType as Car } from '../../interfaces/models/car';
import { useHistory } from 'react-router-dom'
interface Props {
  offeredCar:Car
}

const CarCard = ({offeredCar}:Props) => {
  
  const history = useHistory()

  const openCar = () => {
    history.push(`/car/${offeredCar.id}`)
  } 
  

  return(
    <div className='carCard'>
      <div className="carCard-image">
        <div className='carCard-image-header'><p>{offeredCar.description}</p></div>
        <img src={offeredCar.mainImage}/>
      </div>
      <div className='carCard-description'>
        <div className='carCard-description-row'>
          <div className='carCard-description-brandName'>{offeredCar.brand + ' ' + offeredCar.model + ' ' + offeredCar.generation}</div>
          <div className='carCard-description-price'>{ offeredCar.price } zl</div>
        </div>
        <div className='carCard-description-row'>
          <div className='carCard-description-type'>{offeredCar.type} <p>{ offeredCar?.Engine?.fuel_type }</p></div>
          <div className='carCard-description-milage'>{offeredCar.mileage} KM</div>
        </div>
        <div className='carCard-description-row'>
          <div className='carCard-description-comment'>{ offeredCar.year + ', ' + (offeredCar.Engine.volume) as string+ ' ' + offeredCar.Engine.name + ', ' + offeredCar.Engine.power + 'KM, ' + offeredCar.gearBox + ', ' + offeredCar.drive }</div>
          <div className='carCard-description-button' onClick={openCar}>View</div>
        </div>
        
      </div>
      
    
    </div>
  )
}

export default CarCard