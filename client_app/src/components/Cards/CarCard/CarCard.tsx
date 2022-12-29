import { useEffect, useState } from 'react';
import { CarType } from '../../../utils/models/Car';
import  Pie from '../../../components/CarStateScore/CarStateScore';
import './carCard.scss'
import Button, { ButtonSize } from '../../common/button/Button';
import { createKeyValueArrayFromObject, flattenObject } from '../../../utils/helpers/flattenObject';

import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import moment from 'moment';
import { uuid } from '../../../utils/helpers/uuid';
import { getExistingReportsForCar } from '../../../utils/apis/ReportApi';
import { IReport } from '../../../utils/models/Report';
import { report } from 'process';

export enum CarCardModes {
  NONE='NONE',
  CLIENT='CLIENT',
  TECHNICIAN='TECHNICIAN', 
  NOACTION='NOACTION'

}

interface ICarCardProps {
  defaultExpended?: boolean;
  car: CarType;
  mode?: CarCardModes;
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2.1,
  slidesToScroll: 1
};

const CarCard = (props:ICarCardProps) => {

  const navigate = useNavigate();
  const user = useSelector((state:AppState) => state.user.user)
 
  const { car, defaultExpended } = props
  const [ reports, setReports ] = useState<Array<IReport>>([]);
  const [ avg, setAvg ] = useState<number>(0);
  const [ isExtended, setIsExtended ] = useState<boolean>(defaultExpended || false);

  const handleExtend = (e:any) => {
    if(!e.target.classList.contains('light_button')){
      setIsExtended(!isExtended);
    }
  }

  useEffect(() => {
    getExistingReportsForCar(car.id || '').then((res) => {
      setReports(res.data.reports)
      const percents:Array<number> = res.data.reports.map((report:IReport) => report.condition);
      const avg = percents.reduce((acc, number) => {
        return acc + number;
      }, 0) / res.data.reports.length;
      setAvg(avg)
    });
  }, [])

  return(
    <div className={`${ isExtended? 'carCard-expanded':' carCard'}`} onClick={handleExtend}>
      <div className={`${ isExtended? 'carCard-expanded-info':' carCard-info'}`}>
        <p className={`${ isExtended? 'carCard-expanded-info-brand':' carCard-info-brand'}`}>{ car?.CarBrand?.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car?.CarModel?.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car?.CarGeneration?.name }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming':' carCard-info-naming'}`}>{ car?.year }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming carCard-expanded-info-naming-details':' carCard-info-naming carCard-info-naming-details'}`}>{ car?.registrationNumber || 'No registration plates' }</p>
        <p className={`${ isExtended? 'carCard-expanded-info-naming carCard-expanded-info-naming-details':' carCard-info-naming carCard-info-naming-details'}`}>{ car?.vin?.substring(0, 30) + '...' || 'No vin'}</p>
        <div className='carCard-expanded-info-naming-buttons'>
          {(user?.role !== 'Client' &&  isExtended) && <Button onClick={() => { 
            navigate(`/technician/report/add/${props?.car?.ReportOverviews?.[0]?.id ?? uuid() }/${car.id}`)
           }} type={false} name={'Add report'} size={ButtonSize.SMALL}/>}
          { user?.role !== 'Client' && isExtended && <Button onClick={() => { navigate(`/car/edit/${car?.id}`) }} type={false} name={'Edit'} size={ButtonSize.SMALL}/>}
          {user?.role === 'Client' && isExtended && props.mode !== CarCardModes.NOACTION && <Button onClick={() => { navigate(`/car/edit/${car?.id}`) }} type={false} name={'Details'} size={ButtonSize.SMALL}/>}
        </div>
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
         { !isExtended && <Pie id='carCard-expanded-state-overall' percentage={avg} color={'white'} label={''} ></Pie>} 
         { isExtended && reports.map((report:IReport) => {
          return(
              <Pie key={report?.id || Date.now()} percentage={report.condition} color={'white'} label={report.type} ></Pie>
          )
         }) }

      </div>
      { isExtended && <div className='carCard-expanded-specs'>
        <div className='carCard-expanded-specs-header'>Specs</div>
        <div className='carCard-expanded-specs-wrapper'>
            {  createKeyValueArrayFromObject(flattenObject(car), ['state', 'id', 'images', 'mainImage', 'description', 'market', 'name', 'registrationPlate', 'model_id', 'vin', 'generation_id', 'location_id', 'engine_id', 'brand_id', 'ReportOverviews']).map((item:any, index: number) => {
              return(
                <div key={index} className='carCard-expanded-specs-wrapper-item'>
                   <div className='carCard-expanded-specs-wrapper-item-key'>{ item[0].replaceAll('_', ' ') } </div> : { ['start_reservation'].includes(item[0]) ? moment(item[1]).format('MMM DD YYYY hh:mm') : item[1]  } 
                </div>
              )
            })}
        </div>
      </div>}
    </div>
  )
};

export default CarCard;