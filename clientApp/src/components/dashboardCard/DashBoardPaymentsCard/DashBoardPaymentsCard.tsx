import { PaymentType } from '../../../interfaces/models/payment'
import './DashboardCardPayment.scss'
import DashBoardScore from '../../dashboardScore/DashBoardScore';
interface Props {
  payment: PaymentType,
  handleClick: (payment:PaymentType) => void
}

const DashBoardPaymentsCard = ({ payment, handleClick }:Props) => {
  
  const countSum = () => {
    return (payment.amount / payment.orderSum ) *  100
  }

  return(
    
     <div className='dashBoardcard-wrapper' onClick={()=>{ handleClick(payment)}}>
      <div className='dashBoardcard-wrapper-orderId'>
        #{ payment.id }
      </div>
      <div className='dashBoardcard-wrapper-body'>
      <div className='dashBoardcard-wrapper-body-payemntSum'>   
        <p>Transfer: </p> {payment.amount}zl / { payment.orderSum }zl 
      </div>
      <DashBoardScore percentage={countSum()} colour={'lightgreen'} label={''} ></DashBoardScore>
      </div>
    </div>
  )
}

export default DashBoardPaymentsCard