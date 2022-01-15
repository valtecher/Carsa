import React from 'react'
import './OrderStatus.scss'

interface Props {
  label:string
}

const OrderStatus = ({ label }:Props) => {

  return(
    <div className='orderStatus'>
      <div className='orderStatus-dot'></div>
      <div className='orderStatus-label'>{label}</div>
   </div>
  )
}

export default OrderStatus;