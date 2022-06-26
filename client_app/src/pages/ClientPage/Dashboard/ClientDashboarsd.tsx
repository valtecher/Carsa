import './clientDashboard.scss'
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import { IPayment } from '../../../utils/models/Payments';
import { IOrder } from '../../../utils/models/Order';
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


const ClientDashboard = () => {

  const [ orders, setOrders ] = useState<Array<IConfiguration>>([])
  const [ payments, setPayments ] = useState<Array<IPayment>>([]);
  const [ cars, setCars ] = useState<Array<CarType>>([]);
  const navigate = useNavigate()

  useEffect(() => {
    getLastOrders().then((res) => {
      setOrders(res.data);
    })

    getLastCars().then((res) => {
      setCars(res.data)
    })

    getLastPayments('test').then((res) => {
      setPayments(res.data);
    })
  }, [])

  return(
    <div>
        <Header/>
        <SideMenu/>
        <div className='clientDashboard'>
          <div className='clientDashboard-mainInfo'>Last Events</div>
          <Button outerFunction={() => {navigate('/order/add')}} type={true} name={'Add Order'}  />
          <div className='clientDashboard-subInfo'>Last Orders</div>
          <div className='clientDashboard-section'>
            { orders.map((order) => {
              return(<div>
                <ConfigurationCard configuration={order} />
              </div>)
            }) }
          </div>
          <div className='clientDashboard-subInfo'>Last Cars</div>
          <div  id='clientDashboard-car' className='clientDashboard-section'>
            { cars.map((car) => {
              return(<div key={car.id}>
                <CarCard car={car}  />
              </div>)
            }) }
          </div>
          <div className='clientDashboard-subInfo'>Last Payments</div>
          <div id='clientDashboard-payment' className='clientDashboard-section'>
            { payments.map((payment) => {
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
