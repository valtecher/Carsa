import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CarCard from '../../../components/Cards/CarCard/CarCard';
import ConfigurationCard from '../../../components/Cards/ConfigurationCard/ConfigurationCard';
import Header from '../../../components/header/Header';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { AppState } from '../../../redux/store';
import { retrieveAllClientOrders } from '../../../utils/apis/OrderApi';
import { CarType, dummyCar } from '../../../utils/models/Car';
import { OrderType } from '../../../utils/models/Order';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import './ClientOrders.scss'

const ClientOrder = () => {
  const clientId = useSelector((state:AppState) => state.user.user.client_id) || 'test';
  const [ orders, setOrders ] = useState<any>();

  useEffect(() => {
    if(clientId){
      retrieveAllClientOrders(clientId).then((res:any) => {
        setOrders(res.data);
      });
    }
    
  }, []);

  return(
    <div>
      <Header/>
      <SideMenu/>
      <div className='clientOrders'>
        { orders?.map((order:any, index: number) => {
          return(
            <div key={index} className=''>
            { order.type === OrderType.Package ? <ConfigurationCard configuration={order as IConfiguration}/> : <CarCard car={order?.car_order?.[0] as CarType}/>} 
            </div>
          )
        }) }
      </div>
    
    </div>
  )
}

export default ClientOrder; 