import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CarCard from '../../../components/Cards/CarCard/CarCard';
import ConfigurationCard from '../../../components/Cards/ConfigurationCard/ConfigurationCard';
import Header from '../../../components/header/Header';
import SideMenu from '../../../components/SideMenu/SideMenu';
import { AppState } from '../../../redux/store';
import { configuration, retrieveAllClientOrders } from '../../../utils/apis/OrderApi';
import { CarType, dummyCar } from '../../../utils/models/Car';
import { orderType } from '../../../utils/models/Order';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import { User } from '../../../utils/models/User';
import './ClientOrders.scss'

const ClientOrder = () => {
  const clientId = useSelector((state:AppState) => (state.user.user as User)?.id) || 'test';
  const [ orders, setOrders ] = useState([ configuration, configuration, configuration, dummyCar, dummyCar ]);

  useEffect(() => {
    if(clientId){
      retrieveAllClientOrders(clientId).then((res:any) => {
        setOrders(res);
      });
    }
    
  }, []);

  return(
    <div>
      <Header/>
      <SideMenu/>
      <div className='clientOrders'>
        { orders.map((order, index: number) => {
          return(
            <div key={index} className=''>
            { order.type === orderType.Package ? <ConfigurationCard configuration={order as IConfiguration}/> : <CarCard car={order as CarType}/>} 
            </div>
          )
        }) }
      </div>
     
    </div>
  )
}

export default ClientOrder; 