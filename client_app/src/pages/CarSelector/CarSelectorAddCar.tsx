import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCarByLink } from '../../utils/apis/CarScapperApi';
import { createOrder } from '../../utils/apis/OrderApi';
import SimpleCard from '../../components/Cards/SimpleCard/SimpleCard';
import Button from '../../components/common/button/Button';
import Header from '../../components/header/Header';
import { addCarToOrder } from '../../utils/apis/ConfigurationApi';


const CarSelectorAddCar = () => {
    const navigate = useNavigate();
    const params = useParams();

    const userId = useSelector((appState:any) => appState.user.user.Person.id)
    
    const [ carLink, setCarLink ] = useState<string>('');
    
    return (
        <div>
            <Header/>
            <div style={{ marginTop: '10vh', position: 'absolute' }}>
                <SimpleCard width='500px'>
                <div className='createOrder-header'>Fetch Car By link</div>
                <div className='createOrder-body'>
                <input name='createOrder-link' placeholder='Car link' value={carLink} onChange={(e) => {
                    setCarLink(e.target.value)
                }}></input>
                </div>
                <div className='createOrder-actions'>
                <Button onClick={() => {
                    fetchCarByLink(carLink).then((car) => {
                    const configuration_id = params.configurationId;
                    addCarToOrder({ car, configuration_id }).then((res) => {
                        navigate('/carSelector/dashboard')
                    })
                    })
                }} type={false} name={'Submit'}></Button>  
            </div>
            </SimpleCard>
          </div>
        </div>

    )
        
}

export default CarSelectorAddCar

