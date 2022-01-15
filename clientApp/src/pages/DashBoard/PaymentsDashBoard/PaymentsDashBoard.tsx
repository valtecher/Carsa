import React, { useEffect, useState, FunctionComponent, PureComponent } from 'react'
import './PaymentsDashboards.scss'
import SideMenu from '../../../components/sideMenu/SideMenu';
import DashBoardInfo from '../../../components/dashboardInfo/DashBoardInfo';
import { useDispatch, useSelector } from "react-redux";
import {getPaymentsAttemp, setSelectedPayment} from "../../../redux/actions/paymentsActions";
import {PaymentType} from "../../../interfaces/models/payment";
import DashBoardPaymentsCard from '../../../components/dashboardCard/DashBoardPaymentsCard/DashBoardPaymentsCard';
import { storeState } from '../../../redux/store';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { deleteSelectedPayment} from '../../../redux/actions/paymentsActions'
import { LineChart, LabelList, Tooltip, Line } from 'recharts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import moment from 'moment';


const PaymentDashBoard = () => {

    const dispatch = useDispatch()
    const payments:Array<PaymentType> = useSelector((state:storeState) => {return state.payments.payments})
   
    const selectedPayment:PaymentType = useSelector((state:storeState) => { return state.payments.selectedPayment })
    const [ leftSum, setLeftSum ] = useState<Array<{amount: number, left: number, date: Date}>>()
    
    const handleClick = (payment:PaymentType) => {
      dispatch(setSelectedPayment(payment))
    }

    const selectPaymentsForOrder = () => {
      let leftOverArr:Array<{ amount: number, left: number, date: Date }> = []
      let sum = 0;
      payments.forEach((payment:PaymentType)=> {
        if(payment?.order_id === selectedPayment?.order_id){
          const leftOver:{ amount: number, left: number, date: Date } = { amount: payment.amount, left: selectedPayment?.orderSum - (payment.amount + sum), date: payment.date }
          sum += payment.amount;
          leftOverArr.push(leftOver)
        }
      })
      setLeftSum(leftOverArr)
    }
    useEffect(() => {
      console.log('Api payment call');
        dispatch(getPaymentsAttemp());
        selectPaymentsForOrder();
    }, [])

    useEffect(() => {
      selectPaymentsForOrder();
  }, [selectedPayment])

  const handleCloseInfo = () => {
    dispatch(deleteSelectedPayment());
  }
  return(
 <div className={'dashboard'}>
      <SideMenu/>
      <div className='dashboard-workSpace'>
        <div className='dashboard-itemWrapper'>
            { [...payments || []].map((payment:PaymentType) => {
                return(
                    <div>
                       <DashBoardPaymentsCard payment={payment} handleClick={handleClick} ></DashBoardPaymentsCard>
                    </div>
                )
            }) }
        </div>
        <DashBoardInfo>
        <div className='dashBoardInfo-wrapper-header'>
          <div> {selectedPayment? '#' : '' } {selectedPayment?.id}</div>
          
          <div>
          { selectedPayment? <ImportExportIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' } 
          { selectedPayment? <EditIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' }
            <CloseIcon onClick={handleCloseInfo} className='dashBoardInfo-wrapper-header-icon' fontSize='large' color={ selectedPayment? 'error' : 'disabled' }/>
          </div>
        </div>
        { selectedPayment?  <div className='dashBoardInfo-wrapper-body'>
        <div className='dashBoardInfo-wrapper-body-label' >
            { selectedPayment?.CardPayment ? 'Card Payment: ' : selectedPayment?.CashPayment ?  'Cash Payment: ' : 'Unknown Payment Method: '} <p>{ selectedPayment?.id }</p>
          </div>
          <div className='dashBoardInfo-wrapper-body-details'>
            <div className='dashBoardInfo-wrapper-body-details-owner'>
              <p>{ selectedPayment?.CardPayment? selectedPayment.CardPayment.id : selectedPayment?.CashPayment?.id}</p>
              <p><AttachMoneyIcon fontSize='large'/> { selectedPayment?.amount} ZL</p>
              {selectedPayment?.CardPayment? <p> <CreditCardIcon fontSize='large'/> { selectedPayment?.CardPayment?.card_number}</p> : ''}
              { selectedPayment?.CardPayment? <p> <PersonIcon fontSize='large'/> { selectedPayment?.CardPayment?.ownerName}</p> : '' }
              <p> <CalendarTodayIcon fontSize='large'/> { moment(selectedPayment?.date).format('L')}</p>
            </div>
            <ArrowRightAltIcon fontSize='large'/>
            <div>
              <p> <ShoppingCartIcon fontSize='large'/> { selectedPayment?.order_id }</p>
              <p><PriceCheckIcon fontSize='large'/>{ leftSum?.slice(-1)?.[0]?.left} zl</p>
            </div>
          </div>
          <div className='dashBoardInfo-wrapper-body-paymentChart'>
            <LineChart width={300} height={100} data={leftSum}>
              <Tooltip/>
              <Line type="monotone" name='amount left' dataKey="left" stroke="#8884d8" strokeWidth={2} />
              <Line/>
            </LineChart>
            <p>Left Amount: { leftSum?.[leftSum?.length -1]?.left} zl</p>
          </div>
       
        </div>: '' }
       
        </DashBoardInfo>

      </div>

    </div>
  )
}

export default PaymentDashBoard;