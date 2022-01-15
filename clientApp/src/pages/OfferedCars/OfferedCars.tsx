import React, { useEffect, useState } from 'react';
import CarCard from '../../components/carCard/CarCard';
import Header from '../../components/header/Header';
import FilterComponent from '../../components/filterComponent/FilterComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getCarAttempt } from '../../redux/actions/carActions';
import { CarType as Car } from '../../interfaces/models/car';
import './offerGrid.scss'
import PageLabel from '../../components/pageLabel/PageLabel';

const OfferedCars = () => {
  const cars:Array<Car> = useSelector((state:any) => {return state.cars.cars})
  const [ carView, setCarView ] = useState(cars)
  const dispatch = useDispatch()

  useEffect(()=>{
    setCarView(cars)
  }, [cars])

  const filter = (options:any, rangeOptions:any) => {
    /// TODO: Refactor code to remove ifs because it complexes code understanding
      console.log('Options: ', options)
      if(options.Brand) setCarView(cars.filter((car)=>{return options.Brand.includes(car.brand)}))
      if(options.Model) setCarView(cars.filter((car)=>{return options.Model.includes(car.model)}))
      if(options.GearBox) setCarView(cars.filter((car)=>{return options.Model.includes(car.gearBox)}))
      if(options.Generation) setCarView(cars.filter((car)=>{return options.Generation.includes(car.generation)}))
      if(options.FuelType) setCarView(cars.filter((car)=>{return options.FuelType.includes(car.Engine.fuel_type)}))
      if(options.Drive) setCarView(cars.filter((car)=>{return options.Drive.includes(car.drive)}))
      // if(options.Location) setCarView(cars.filter((car)=>{return options.Drive.includes(car.location)}))
      if(rangeOptions.Power){
        setCarView(cars.filter((car)=>{
          if(rangeOptions.Power.until && rangeOptions.Power.from == ''){
            console.log('no from')
            return car.Engine.power < rangeOptions.Power?.until 
          } else 
          if(rangeOptions.Power.from && rangeOptions.Power.until == ''){
            console.log('no until')
            return car.Engine.power > rangeOptions.Power?.from 
          }else 
          if(rangeOptions.Power.from && rangeOptions.Power.until){
            console.log('both')
            return car.Engine.power < rangeOptions.Power?.until && car.Engine.power > rangeOptions.Power?.from 
          }
          
        }))
      }
      if(rangeOptions.EngineVolume){
        setCarView(cars.filter((car)=>{
          if(rangeOptions.EngineVolume.until && rangeOptions.EngineVolume.from == ''){
            return car.Engine.volume < rangeOptions.EngineVolume?.until 
          } else 
          if(rangeOptions.EngineVolume.from && rangeOptions.EngineVolume.until == ''){
            return car.Engine.volume > rangeOptions.EngineVolume?.from 
          }else 
          if(rangeOptions.EngineVolume.from && rangeOptions.EngineVolume.until){
            return car.Engine.volume < rangeOptions.EngineVolume?.until && car.Engine.power > rangeOptions.EngineVolume?.from 
          }
          
        }))
      }
      if(rangeOptions.Milage){
        setCarView(cars.filter((car)=>{
          if(rangeOptions.Milage.until && rangeOptions.Milage.from == ''){
            return car.mileage < rangeOptions.Milage?.until 
          } else 
          if(rangeOptions.Milage.from && rangeOptions.Milage.until == ''){
            return car.mileage > rangeOptions.Milage?.from 
          }else 
          if(rangeOptions.Milage.from && rangeOptions.Milage.until){
            return car.mileage < rangeOptions.Milage?.until && car.mileage > rangeOptions.Milage?.from 
          }
          
        }))
      }

  }

  useEffect(()=>{
    dispatch(getCarAttempt())
  }, [])

  return(
    <div>
      <PageLabel title={'Offers'}/>
      <Header/>
      <FilterComponent filter={filter}/>
      <div className='offerGrid'>
        { carView.map((car:Car)=>{
            return(
              <div key={car.id}>
                <CarCard offeredCar={car}/>    
              </div>
            )
        }) }
      </div>
    </div>
  )
}

export default OfferedCars