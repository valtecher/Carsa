import React, { useEffect, useState } from 'react';
import './DashBoard.scss';
import SideMenu from '../../components/sideMenu/SideMenu';
import Paper from '../../components/shared/Papper/Papper'
import { useSelector, useDispatch } from 'react-redux';
import { storeState } from '../../redux/store';
import { LineChart, LabelList, Tooltip, Line, XAxis, YAxis} from 'recharts';
import { getPaymentsAttemp } from '../../redux/actions/paymentsActions';
import { getOrder } from '../../redux/actions/orderActions';
import { getClientCar } from '../../redux/actions/carActions';
import { PaymentType } from '../../interfaces/models/payment';
import { CarType } from '../../interfaces/models/car';
import { useHistory } from 'react-router-dom';



const DashBoard = () => {

  const dispatch = useDispatch();
  const history = useHistory();


  const cars = useSelector((state: storeState) => { return state.cars.cars })
  const payments = useSelector((state: storeState) => { return state.payments.payments })
  const orders = useSelector((state: storeState) => { return state.orders.orders})
 
  const [ paymentsSum, setPaymentsSum ] = useState<Array<{id: number, amount: number}>>([])
  const [paymentsState, setPaymentsState] = useState<Array<any>>([...payments])

  const [ carsToShow, setCarsToShow ] = useState<Array<CarType>>();


  useEffect(() => {
    dispatch(getPaymentsAttemp());
    dispatch(getOrder())
    dispatch(getClientCar())
  }, [])

  useEffect(()=> {
    setPaymentsState(payments)
    handlePaymentsSum()
  }, [payments])


  useEffect(() => {
    const carsTmp:Array<CarType> = []

    cars.forEach((carsinOrder:Array<CarType>) => {
      carsinOrder.forEach((car:CarType) => {
        carsTmp.push(car)
      })
    })

    setCarsToShow(carsTmp);
  }, [cars])

  const handlePaymentsSum = () => {
    let tmpSum:Array<{id: number, amount: number }> = [];
   [...paymentsState].reduce(function(acc:number, currentValue:PaymentType, index: number){
      tmpSum.push({id: index, amount: acc});
      return acc += currentValue.amount;
    }, 0);
    setPaymentsSum([...tmpSum]);
  }


  return(
    <div className={'dashboard-wrapper'}>
      <SideMenu/>
      <div className='dashboard-wrapper-nav'>
        <div className='dashboard-wrapper-nav-button' onClick={()=> { history.push('/dashboard/createOrder') }}>Create order</div>
        <div className='dashboard-wrapper-nav-button' onClick={()=> { history.push('/account') }}>Edit Account</div>
      </div>
      <div className='dashboard-wrapper-quickInfo'>
      <Paper size='m'>
        <div className='dashboard-wrapper-quickInfo-header'>
          Recent Cars
        </div> 
        <div className='dashboard-wrapper-quickInfo-body'>
          {[...carsToShow || []].map((car:CarType) => {
            return(
                <div className='dashboard-wrapper-quickInfo-body-item'>
                  { car?.CarGeneration?.CarModel?.CarBrand?.name } { car?.CarGeneration?.CarModel?.name }  { car?.CarGeneration?.name } { car.Engine.name } { car.year } { car.vin } { `${car.price} zl` } 
                </div>
            )
            
          })}
        </div>
      </Paper>
      <Paper size='m'>
        <div className='dashboard-wrapper-quickInfo-header'>
          Recent Payments
        </div>
        <div className='dashboard-wrapper-quickInfo-body'>
            <LineChart width={400} height={200} data={paymentsSum}>
              <Tooltip/>
              <Line type="monotone" name='amount left' dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              <Line/>
              <XAxis dataKey={'id'}></XAxis>
              <YAxis dataKey={'amount'}></YAxis>
            </LineChart>
        </div>
      </Paper>
      </div>
      <div className='dashboard-wrapper-body'>
        <div className='dashboard-wrapper-body-feed'>
        {[...carsToShow || []].map((car:CarType) => {
            return(
              <Paper size='sw'>
              <div className='dashboard-wrapper-quickInfo-header'>
                Car:
              </div>
              <div className='dashboard-wrapper-quickInfo-body-item'>
                  { car?.CarGeneration?.CarModel?.CarBrand?.name } { car?.CarGeneration?.CarModel?.name }  { car?.CarGeneration?.name } { car.Engine.name } { car.year } { car.vin } { `${car.price} zl` } 
                </div>
            </Paper>
            )
            
          })}
          <Paper size='sw'>
           <div className='dashboard-wrapper-quickInfo-header'>
            Payment:
            </div>
          </Paper>
        </div>
        <Paper className='dashboard-wrapper-body-news' size='ll'>
        <div className='dashboard-wrapper-quickInfo-header'>
          News: 
        </div>
        <div>Happy new Year</div>
        <div>
          New Year sales
        </div>
        </Paper>
      </div>

      
    </div>
  )

}
export default DashBoard;