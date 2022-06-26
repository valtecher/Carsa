import moment from 'moment';
import { IPayment } from '../../../utils/models/Payments';
import './paymentCard.scss'

interface IPaymentCardProps {
  payment:IPayment
}

const PaymentCard = (props:IPaymentCardProps) => {
  const { payment } = props;
  return (
    <div className='paymentCard'>
      <div>
        <div className='paymentCard-mainInfo'>Payment</div>
        <div className='paymentCard-smallInfo'>{ payment.id }</div>
        <div className='paymentCard-smallInfo'> {moment().toISOString()} </div>
      </div>
      <div className='configurationCard-separator'></div>
      <div className='configurationCard-section'>
      <div className='paymentCard-info'>   { payment.amount } / { payment.sum } zl</div>
     
      </div>
    </div>
  )
}

export default PaymentCard;