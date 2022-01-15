import React, { useState, useEffect } from 'react'
import './DashBoardInfo.scss'
import { useSelector, useDispatch } from 'react-redux'; 
import { OrderType as Order } from '../../interfaces/models/order';
import { deleteSelectedOrder } from '../../redux/actions/orderActions';

const DashBoardInfo = (props:any) => {
  const dispatch = useDispatch();
  const selectedOrder:Order = useSelector((state:any)=>{ return state.orders.selectedOrder })
  const [ selectedOrdeState, setSelctedOrderState ] = useState<Order>(selectedOrder);

  useEffect(()=>{
    setSelctedOrderState(selectedOrder)
  }, [ selectedOrder ])

  const handleCloseInfo = () => {
    dispatch(deleteSelectedOrder());
  }

  return(
    <div className='dashBoardInfo-wrapper'>
      { props.children }
    </div>
  )
}

export default DashBoardInfo;