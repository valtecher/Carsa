import React, { useState, useEffect } from 'react'
import './OrderDashBoard.scss'
import SideMenu from '../../../components/sideMenu/SideMenu';
import DashBoardCard from '../../../components/dashboardCard/DashBoardCard';
import DashBoardInfo from '../../../components/dashboardInfo/DashBoardInfo';
import DashBoardInfoItem from '../../../components/dashboardInfoItem/DashBoardInfoItem';
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../../redux/actions/orderActions'
import { OrderType as Order } from '../../../interfaces/models/order';
import { setSelectedOrder } from '../../../redux/actions/orderActions';
import OrderStatus from '../../../components/orderStatus/OrderStatus'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { cartodasboardview } from '../../../utils/carConventor';
import { deleteSelectedOrder } from '../../../redux/actions/orderActions';


const OrderDashBoard = () => {

  const dispatch = useDispatch();
  const orders = useSelector((state:any) => { return state.orders.orders })
  
  useEffect(()=>{
    console.log('Api call');
    dispatch(getOrder())
  }, [])

  const handleClick = (order: Order) => {
    dispatch(setSelectedOrder(order))
  };

  const selectedOrder:Order = useSelector((state:any)=>{ return state.orders.selectedOrder })
  const [ selectedOrdeState, setSelctedOrderState ] = useState<Order>(selectedOrder);

  useEffect(()=>{
    setSelctedOrderState(selectedOrder)
  }, [ selectedOrder ])

  const handleCloseInfo = () => {
    dispatch(deleteSelectedOrder());
  }


  return(
    <div className={'dashboard'}>
      <SideMenu/>
      <div className='dashboard-workSpace'>
        <div className='dashboard-itemWrapper'>
          {[...orders || []].map((order:Order)=>{
            return(
              <DashBoardCard handleClick={handleClick} order={order}/>
            )
          })}  
        </div>
        <DashBoardInfo>
          <div className='dashBoardInfo-wrapper-header'>
            <div> {selectedOrder? '#' : '' } {selectedOrdeState?.id}</div>
            { selectedOrder? <OrderStatus label={selectedOrder?.status} /> : '' }
            <div>
            { selectedOrder? <ImportExportIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' } 
            { selectedOrder? <EditIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' }
              <CloseIcon onClick={handleCloseInfo} className='dashBoardInfo-wrapper-header-icon' fontSize='large' color={ selectedOrder? 'error' : 'disabled' }/>
            </div>
        </div>
        { selectedOrdeState?.cars.map((car)=>{
          console.log(car)
          const carNew = cartodasboardview(car);
          return (
            <div>
                  <DashBoardInfoItem car={carNew}/>
            </div>
          )
        }) }
        </DashBoardInfo>
      </div>
      <div className='dashboard-workSpace-Cars'>
        
      </div>
    </div>
  )
}

export default OrderDashBoard;