import './clientDashboard.scss'
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import { IPayment } from '../../../utils/models/Payments';
import { CarType } from '../../../utils/models/Car';
import { getLastOrders } from '../../../utils/apis/OrderApi';
import { getLastCars } from '../../../utils/apis/CarsApi';
import { getLastPayments } from '../../../utils/apis/PaymentApi';
import ConfigurationCard from '../../../components/Cards/ConfigurationCard/ConfigurationCard';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import CarCard from '../../../components/Cards/CarCard/CarCard';
import PaymentCard from '../../../components/Cards/PaymentCard/PaymentCard';
import SideMenu from '../../../components/SideMenu/SideMenu';
import Button from '../../../components/common/button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';


const ClientDashboard = () => {

  const [ orders, setOrders ] = useState<Array<IConfiguration>>([])
  const [ payments, setPayments ] = useState<Array<IPayment>>([]);
  const [ cars, setCars ] = useState<Array<CarType>>([]);

  const client_id = useSelector((state:AppState) => state.user.user.client_id );

  const navigate = useNavigate()

  useEffect(() => {
    getLastOrders(client_id).then((res) => {
      setOrders(res.data);
    })

    getLastCars(client_id).then((res:any) => {
      setCars(res)
    })

    getLastPayments(client_id).then((res) => {
      setPayments(Object.values(res).flat() as any);
    })
  }, [])

  return(
    <div>
        <Header/>
        <div className='clientDashboard'>
         
         <div className='clientDashboard-header'>
          <div className='clientDashboard-mainInfo'>Last Events</div>
          <Button onClick={() => {navigate('/order/create')}} type={true} name={'Add Order'}  />
        </div> 
          <div className='clientDashboard-subInfo'>Last Orders</div>
          <div className='clientDashboard-section'>
            { orders.map((order, index:number) => {
              return(<div key={index}>
                <ConfigurationCard configuration={order} />
              </div>)
            }) }
          </div>
          <div className='clientDashboard-subInfo'>Last Cars</div>
          <div  id='clientDashboard-car' className='clientDashboard-section'>
            { cars?.map((car) => {
              return(<div key={car.id}>
                <CarCard car={car}  />
              </div>)
            }) }
          </div>
          <div className='clientDashboard-subInfo'>Last Payments</div>
          <div id='clientDashboard-payment' className='clientDashboard-section'>
            { payments?.map((payment) => {
              return(
              <div className='' key={payment.id}>
                <PaymentCard payment={payment}/>
              </div>
            )
            }) }
          </div>
        </div>
    </div>
  )
}

export default ClientDashboard;
