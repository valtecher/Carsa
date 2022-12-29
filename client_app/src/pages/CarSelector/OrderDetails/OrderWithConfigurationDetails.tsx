import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../../components/common/button/Button';
import { getOrderbyDetails } from '../../../utils/apis/OrderApi';
import './orderWithConfigurationDetails.scss';
import Header from '../../../components/header/Header';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import { createKeyValueArrayFromObject, flattenObject } from '../../../utils/helpers/flattenObject';
import { CarType } from '../../../utils/models/Car';
import CarCard from '../../../components/Cards/CarCard/CarCard';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { ISpecification } from '../../../utils/models/Specification';

const OrderWithConfigurationDetails =  (props:any) => {
  
  const params = useParams();
  const user = useSelector((state:AppState) => state.user.user );
  const [orderConfiguration, setOrderConfiguration] = useState<IConfiguration>();
  const [ specs, setSpecs] = useState<any>();



  useEffect(() => {
    if(!orderConfiguration){
      getOrderbyDetails(params.id || '').then((res) => {
        setOrderConfiguration(res.data);
      });
    } else {
      setSpecs(createKeyValueArrayFromObject(flattenObject((orderConfiguration.Configuration)), ['id', 'order_id', 'deletedAt']))
    }
  }, [orderConfiguration])

  return(
    <div>
      <Header/>
      <div className='orderWithConfigurationDetails'>    
            <div className='orderWithConfigurationDetails-header'>
              <p className='orderWithConfigurationDetails-header-label'>Details</p>
             { user?.role !== 'Client' ? <Button onClick={() => {}} type={true} name='Add Car'/> : '' } 
            </div>
            <div className='orderWithConfigurationDetails-details'>
              <div className='orderWithConfigurationDetails-details-order'>
                <div className='orderWithConfigurationDetails-details-header'>
                    { orderConfiguration?.type === 'Configuration' ? 'Order Configuration' : 'Single Car' }
                    <div className='orderWithConfigurationDetails-details-header-label'>
                      #{orderConfiguration?.id}
                    </div>
                </div>
                <div className='orderWithConfigurationDetails-details-order-body'>
                  { [...specs || []].map((pair:any, index:number) => {
                    return <div key={index} className='keyValuePair'>
                            { pair[0]?.replaceAll('_', ' ') } : { pair[1] }
                          </div>
                  })}
                </div>
              </div>
              <div className='orderWithConfigurationDetails-details-client'>
                <div className='orderWithConfigurationDetails-details-header'>
                    Client
                    <div className='orderWithConfigurationDetails-details-header-label'>
                      # { orderConfiguration?.Client?.person_id }
                    </div>
                </div>
                <div className='orderWithConfigurationDetails-details-client-body'>
                  Name: { orderConfiguration?.Client?.first_name } { orderConfiguration?.Client?.last_name }
                </div>
              </div>
            </div>

            <div className='orderWithConfigurationDetails-cars'>
                  <div className='orderWithConfigurationDetails-cars-header'>
                    Cars
                  </div>
                  <div className='orderWithConfigurationDetails-cars-items'>
                      { orderConfiguration?.OrderCars?.length === 0 ? 'No cars in this order' : orderConfiguration?.OrderCars?.map((car:CarType, index:number) => {
                        return(
                          <div key={index}>
                            <CarCard car={car}/>
                          </div>
                          
                        )
                      }) }
                  </div>
            </div>
          </div>
    </div>
   
  )
}

export default OrderWithConfigurationDetails;