import { useState } from 'react';
import { CarType } from '../../../utils/models/Car';
import './carCard.scss'

interface ICarCardProps {
  car: CarType
}

const CarCard = (props:ICarCardProps) => {
  const { car } = props
  const [ isExtended, setIsExtended ] = useState<boolean>();

  const handleExtend = () => {
    setIsExtended(!isExtended);
  }

  return(
    <div className={`carCard ${ isExtended? 'carCard-expanded':''}`} onClick={handleExtend}>
      { car.CarBrand.name }
    </div>
  )
};

export default CarCard;