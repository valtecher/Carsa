import './ReportMainPage.scss'
import React, { useEffect, useState } from 'react'
import PageLabel from '../../../components/pageLabel/PageLabel';
import Header from '../../../components/header/Header';
import { getAllCars } from '../../../services/car/carService';
import { CarType } from '../../../interfaces/models/car';
import Paper from '../../../components/shared/Papper/Papper';
import { useHistory } from 'react-router-dom';


const ReportMainPage = () => {
  const [ cars, setCars ] = useState<Array<CarType>>([])
  const history = useHistory();
  useEffect(() => {
    getAllCars().then((res:any) => {
      setCars(res.data)
    })
    
  }, [])

  const onCarClick = (carId: string) => {
    console.log('car clikcked')
    history.push(`/report/${carId}`)
  }

  return(
    <div className='mainReport'>
      <PageLabel title={'Report'}/>
      <Header/>
      <div className='mainReport-body'>
        <Paper size='xla'>
          <div className='mainReport-body-header'>Select Car</div>
          { cars.map((car) => {
            return(
              <div key={car.id} onClick={() => {
                onCarClick(car?.id || '')
              }}>
              <Paper size='sws' className='mainReport-body-item' >
                <div className='mainReport-body'>
                  <div>{ car?.CarGeneration?.CarModel?.CarBrand?.name } { car?.CarGeneration?.CarModel?.name } { car?.CarGeneration?.name }</div>
                  <div>{ car?.Engine?.volume }  { car?.Engine?.name }  { car?.Engine?.fuel_type }</div>
                  <div>{ car?.year }</div>
                  <div>{ car?.color }</div>
                  <div className='mainReport-body-item-price'>{ car?.price + 'ZL'} </div>
                </div>
              </Paper>
              </div>
            )
          }) }
        </Paper>
      </div>
    </div>
  )
}

export default ReportMainPage;