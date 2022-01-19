import React, { useEffect, useState } from 'react'
import './DashBoardCard.scss'
import OrderStatus from '../orderStatus/OrderStatus'
import { OrderType as Order } from '../../interfaces/models/order'
import moment from 'moment';
import { CarBrandType, CarGenerationType, CarModelType } from '../../interfaces/models/generation';
interface Props {
  order:Order
  handleClick: (order: Order) => void
}

const DashBoardCard = ({ order, handleClick }:Props) => {

  const [ orderType, setOrderType ] = useState<string>();

  useEffect(() => {
    if(order.order_configuration.length !== 0 ){
      console.log('Order with configuration: ', order);
      setOrderType('package')
    }
    
  }, [])
  
  return(
    <div>
      {orderType !== 'package' ?  
      <div className='dashBoardcard-wrapper' onClick={()=>{ handleClick(order)}}>
        <div className='dashBoardcard-wrapper-orderId'>
          #{ order.id }
        </div>
        <div className='dashBoardcard-wrapper-status'>
          <OrderStatus label={order.status}/>
        </div>
        <div className='dashBoardcard-wrapper-row'>
          <div className='dashBoardcard-wrapper-carName'>
            {(order?.cars?.[0]?.CarGeneration as CarGenerationType)?.CarModel?.CarBrand?.name} {(order?.cars?.[0]?.CarGeneration as CarGenerationType )?.CarModel?.name } {(order?.cars?.[0]?.CarGeneration as CarGenerationType)?.name}
          </div>
          <div className='dashBoardcard-wrapper-orderDate'>
            {moment(order.date).format('L').toString()}
          </div>
        </div>
      </div>   : 
        <div className='dashBoardcard-wrapper' onClick={()=>{ handleClick(order)}}>
        <div className='dashBoardcard-wrapper-orderId'>
          #{ order.id }
        </div>
        <div className='dashBoardcard-wrapper-status'>
          <OrderStatus label={order.status}/>
        </div>
        <div className='dashBoardcard-wrapper-row'>
        <div className='dashBoardcard-wrapper-carName'>
            Package Order
          </div>
        </div>
      </div>
       } 
    </div>
  )
}

export default DashBoardCard