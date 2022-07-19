import { CarType } from '../../../utils/models/Car';
import Button from '../../common/button/Button';
import './OffersCarCard.scss'

interface IProps{
  car: CarType
}
const OffersCarCard = (props:IProps) => {
    const { car } = props;
  
  return(
    <div className='offersCarCard'>
      <div className='offersCarCard-image'>
        <img src={car.images?.[0]} />
      </div>
      <div className='offersCarCard-title'>
        <div className='offersCarCard-title-name'>
          {car.CarBrand.name} { car.CarModel.name } { car.CarGeneration.name }
        </div>
        <div className='offersCarCard-title-details'>
          <div className='offersCarCard-title-details-specs'>
            <p>{car.Engine.fuel_type}  { car.year } </p> 
            <p>{ car.Engine.name } { `${car.Engine.volume}Cm` } { `${car.Engine.power}KM` }</p>
          </div>
          <div className='offersCarCard-title-details-price'>
            { `${car.price} zl` }
          </div>
        </div>
      </div>
      <div className='offersCarCard-footer'>
        <Button type={false} name='Details' onClick={() => {}}/>
      </div>
    </div>
  )
}

export default OffersCarCard;

