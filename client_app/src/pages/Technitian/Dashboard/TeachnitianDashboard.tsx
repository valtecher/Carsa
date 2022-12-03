import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import './technicianDashboard.scss';
import { useGeolocated } from "react-geolocated";
import { getCarsByTechnicianId } from '../../../utils/apis/CarsApi';
import { CarType } from '../../../utils/models/Car';
import CarCard, { CarCardModes } from '../../../components/Cards/CarCard/CarCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

const TechnicianDashboard = () => {
 
  const navigate = useNavigate();
  const technician = useSelector((state:AppState) => state.user.user)
  const { coords } = useGeolocated(
    {
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });

  const [ cars, setCars ] = useState<Array<CarType>>([]); 

  useEffect(() => {
      getCarsByTechnicianId(technician?.person_id).then((res) => {
        setCars(res)
      })
    
  }, [])

  return(
    <div>
      <Header/>
      <div className='technicianDashboard'>
        <h1>Cars to check</h1>
        <div className='technicianDashboard-content'>
            { [...cars || []]?.map((car) => {
              return(
                <CarCard mode={CarCardModes.TECHNICIAN} car={car}/>
              )
            }) }
        </div>
      </div>
    </div>
  )
}
export default TechnicianDashboard
