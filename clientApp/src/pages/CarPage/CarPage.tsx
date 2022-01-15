import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCarAttempt } from '../../redux/actions/carActions';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer'
import CarDescription from '../../components/carDescription/CarDescription';
import PageLabel from '../../components/pageLabel/PageLabel';
import Carousel from '../../components/carousel/Carousel'
import { CarType as Car } from '../../interfaces/models/car';

import { ParallaxProvider } from 'react-scroll-parallax';

import './carPage.scss'


const CarPage = (props:any) => {

  const dispatch = useDispatch();
  const id = props.match.params.id;
  const cars:Array<Car> = useSelector((state:any)=>{return state.cars.cars})
  const [car, setCar] = useState<Car>();
  

  useEffect(()=>{
    if(cars.length === 0)
     dispatch(getCarAttempt())
     
  }, [])

  useEffect(()=>{
    cars.forEach((car:Car) => {
      if(car.id === id){
        setCar(car)
      }
    })
  }, [cars])



  return(
    <div>
      <PageLabel title={'Car'}/>
    
      <Header/>
      <div className='carWrapper'>
        
          <div className='carWrapper-header'>
            <div className='carWrapper-header-naming'>{car?.brand + ' ' + car?.model + ' ' + car?.generation }</div>
            <div className='carWrapper-header-location'>Warsaw, Mazowia</div>
            <div className='carWrapper-header-price'>{car?.price} zl</div>
          </div>
          <Carousel images={car?.images || []}/>
   

        <ParallaxProvider >
          <CarDescription car={car}/>
        </ParallaxProvider>
        
        <Footer/>
      </div>
    </div>
  )
}

export default CarPage