import './editCar.scss';
import Header from '../../components/header/Header';
import Carousel from '../../components/carousel/Carousel';
import { CarType } from '../../utils/models/Car';
import { useEffect, useState } from 'react';
import { getCarById } from '../../utils/apis/CarsApi';
import { useParams } from 'react-router-dom';

interface IEditCarProps {

}

const EditCar = (props:IEditCarProps) => {
  
  const params = useParams();
  const [ car, setCar ] = useState<CarType>()

  useEffect(() => {
    getCarById(params.id|| '').then((res) => {
      setCar(res);
    })
  }, [])


  return(
    <div>
      <Header/>
      <div className='editCar'>
        <div className='editCar-header'>
          <div className='editCar-header-label'>Edit Car</div>
          <div className='editCar-header-double'>{ car?.id }</div>
        </div>
        <div className='editCar-header-info '>

        </div>
        <div className='editCar-body'>
          <Carousel images={car?.images || []}/>

        </div>
      </div>
    </div>
  )
}

export default EditCar;