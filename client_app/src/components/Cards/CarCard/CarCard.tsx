import { useState } from 'react';
import { CarType } from '../../../utils/models/Car';
import  Pie from '../../../components/CarStateScore/CarStateScore';
import './carCard.scss'
import Button, { ButtonSize } from '../../common/button/Button';
import { createKeyValueArrayFromObject, flattenObject } from '../../../utils/helpers/flattenObject';

import Slider from "react-slick";

interface ICarCardProps {
  defaultExpended?: boolean;
  car: CarType;
}

const CarCard = (props:ICarCardProps) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.1,
    slidesToScroll: 1
  };
  const { car, defaultExpended } = props
  const [ isExtended, setIsExtended ] = useState<boolean>(defaultExpended || false);

  const handleExtend = () => {
    setIsExtended(!isExtended);
  }


  return(
    <div className={`${ isExtended? 'carCard-expanded':' carCard'}`} onClick={handleExtend}>
      <div className={`${ isExtended? 'carCard-expanded-info':' carCard-info'}`}>
        <p className={`${ isExtended? 'carCard-expanded-info-brand':' carCard-info-brand'}`}>{ car.CarBrand.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car.CarModel.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car.CarGeneration.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car.year }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming carCard-expanded-info-naming-details':' carCard-info-naming carCard-info-naming-details'}`}>{ car?.registrationPlate || 'No registration plates' }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming carCard-expanded-info-naming-details':' carCard-info-naming carCard-info-naming-details'}`}>{ car?.vin || 'No vin'}</p>
        { isExtended && <Button outerFunction={() => {}} type={false} name={'more'} size={ButtonSize.SMALL}/>}
      </div>
      { !isExtended && <div className='carCard-separator'></div>}
      { (isExtended && car.images.length !== 0 ) && 
        <div className='carCard-expanded-gallery'>
          <Slider {...settings}>
            { car.images.map((image:string, index: number) => {

              return (
                <div className='carCard-expanded-gallery-image' key={index} >
                  <img src={image} alt="car image" />
                </div>
              )
              
            }) }
            </Slider>
        </div> 
      }
      <div className={`${ isExtended? 'carCard-expanded-state':' carCard-state'}`}>
         { !isExtended && <Pie id='carCard-expanded-state-overall' percentage={90} color={'white'} label={''} ></Pie>} 
         { isExtended && <Pie percentage={90} color={'white'} label={'Interior'} ></Pie>} 
         { isExtended && <Pie percentage={90} color={'white'} label={'Exterior'} ></Pie>} 
         { isExtended && <Pie percentage={90} color={'white'} label={'Engine'} ></Pie>} 
         { isExtended && <Pie percentage={90} color={'white'} label={'Gearbox'} ></Pie>} 
         { isExtended && <Pie percentage={90} color={'white'} label={'Suspension'} ></Pie>} 
      </div>
      { isExtended && <div className='carCard-expanded-specs'>
        <div className='carCard-expanded-specs-header'>Specs</div>
        <div className='carCard-expanded-specs-wrapper'>
            {  createKeyValueArrayFromObject(flattenObject(car), ['state', 'id', 'images', 'mainImage', 'description', 'market', 'name', 'registrationPlate', 'model_id']).map((item:any, index: number) => {
              return(
                <div key={index} className='carCard-expanded-specs-wrapper-item'>
                   <div className='carCard-expanded-specs-wrapper-item-key'>{ item[0] } </div> : { item[1] } 
                </div>
              )
            })}
        </div>
      </div>}
    </div>
  )
};

export default CarCard;