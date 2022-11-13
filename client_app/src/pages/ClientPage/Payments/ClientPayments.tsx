import axios from 'axios';
import { AppState } from '../../../redux/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PaymentCard from '../../../components/Cards/PaymentCard/PaymentCard';
import Header from '../../../components/header/Header';
import { dummyPayment, IPayment } from '../../../utils/models/Payments';
import styled from 'styled-components';
import SideMenu from '../../../components/SideMenu/SideMenu';

const Wrapper = styled.div`
  position: absolute;
  margin-top: 10vh;
  margin-left: 2%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

`

const ClientPayments = () => {
  const userID = useSelector((state:AppState) => state.user?.user?.client_id)
  const [ payments, setPayments ] = useState<Array<IPayment>>();
  
  useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/payments/client/${userID}`).then((res) => {
        if(res.data){
          setPayments(Object.values(res.data).flat() as any);
        }
      })
   }, [])

  return (
    <div>
      <div>
        <Header/>
        <SideMenu/>
      </div>
      <Wrapper>
        { [...payments || []].map((payment) => {
          return(
            <div key={payment?.id}>
              <PaymentCard payment={payment} ></PaymentCard>
            </div>
          )
        }) }
      </Wrapper>
    </div>
  )
}

export default ClientPayments;