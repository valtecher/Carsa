import React, { useEffect, useState, } from 'react';
import Header from '../../components/header/Header';
import './createOrder.scss';
import AddCarConfiguration from '../CarSelector/AddCarConfiguration/AddCarConfiguration';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../utils/apis/OrderApi';
import SimpleCard from '../../components/Cards/SimpleCard/SimpleCard';
import Button from '../../components/common/button/Button';
import { PackageType } from './Steps/ChooseOrderTypeStep';
import { fetchCarByLink } from '../../utils/apis/CarScapperApi';
import { useSelector } from 'react-redux';
import { CarType } from '../../utils/models/Car';
import CarCard, { CarCardModes } from '../../components/Cards/CarCard/CarCard';



const CreateOrder = () => {

  const navigate = useNavigate();
  const userId = useSelector((appState:any) => appState.user.user.Person.id)
  const [ carLink, setCarLink ] = useState<string>('');
  const [car, setCar] = useState<CarType>();
  const [loading, setLoading] = useState<boolean>(false)
  const [ order, setOrder ] = useState<any>({
    type: '',
    sum: 0, 
    status: 'Payed',
    car: null,
    configuration: null,
    client_id: userId,
  })

  const handleConfigurationSubmit = (configuration: any) => {
    setOrder({...order, sum: 800, type: PackageType.Configuration})
    createOrder({configuration:{...configuration}, order, sum: 800, type: PackageType.Configuration, userId})
  }

  return (
    <div>
      <Header/>
        <div className='createOrder'>
        { order.sum === 0 && (
          <div>
            <SimpleCard width='90%'>
              <AddCarConfiguration onSubmit={handleConfigurationSubmit} />
            </SimpleCard>
            <SimpleCard width='90%'>
              <div className='header'>Add Car</div>
              <div className='body'>In this order you simply add car we go and check its condition</div>
              <div className='actions'>
                <Button onClick={() => { 
                  setOrder({...order, sum: 200, type: PackageType.Single})
                }} type={false} name={'200 zl'} ></Button>
              </div>
            </SimpleCard>
          </div>
        ) }

        { order.sum === 200 && !car && (
          <SimpleCard>
            <div className='createOrder-header'>Fetch Car By link</div>
            <div className='createOrder-body'>
              <input name='createOrder-link' placeholder='Car link' value={carLink} onChange={(e) => {
                setCarLink(e.target.value)
              }}></input>
            </div>
            <div className='createOrder-actions'>
              <Button onClick={() => {
                setOrder({sum: 0, type: '', status: 'Initial', car: null, configuration: null})
              }} type={false} name={'Back'}></Button>  
              {!car && (<Button onClick={() => {
                setLoading(true);
                fetchCarByLink(carLink).then((car) => {
                  setCar(car);
                  if(car) {
                    setLoading(false);
                  }
                  
                })
              }} type={false} name={ loading ? 'Loading' : 'Fetch' }></Button>)}  
          </div>
          </SimpleCard>
        )} 
        {
          order.sum === 200 && car && (
            <SimpleCard>
              <CarCard mode={CarCardModes.NOACTION} car={car}></CarCard>
              <Button onClick={() => {
                  if(car) {
                    createOrder({ order, car, userId, sum: 200 }).then((res) => {
                      navigate('/client/dashboard')
                     })
                  }
              }} type={false} name='Submit'></Button>
            </SimpleCard>
          ) 
        }

        { order.sum === 800 && (
          <SimpleCard>
             <div className='header'>Enter your coniguration</div>
             <div className='actions'>
              <Button onClick={() => {
                setOrder({sum: 0, type: '', status: 'Initial', car: null, configuration: null})
              }} type={false} name={'Back'}></Button>  
              <Button onClick={() => {
              
              }} type={false} name={'Submit'}></Button>  
          </div>
          </SimpleCard>
        ) }
      </div>
    </div>
  );
}

export default CreateOrder