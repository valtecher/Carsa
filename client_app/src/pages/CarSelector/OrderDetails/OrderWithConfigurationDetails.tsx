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

const OrderWithConfigurationDetails =  (props:any) => {
  
  const params = useParams()
  const [orderConfiguration, setOrderConfiguration] = useState<IConfiguration>()
  const [ specs, setSpecs] = useState<any>();

  useEffect(() => {
    if(!orderConfiguration){
      getOrderbyDetails(params.id || '').then((res) => {
        setOrderConfiguration(res.data);
      });
    } else {
      setSpecs(createKeyValueArrayFromObject(flattenObject(orderConfiguration.specs), ['id']))
    }
  }, [orderConfiguration])

  return(
    <div>
      <Header/>
      <div className='orderWithConfigurationDetails'>    
            <div className='orderWithConfigurationDetails-header'>
              <p className='orderWithConfigurationDetails-header-label'>Details</p>
              <p>#908801231232</p>
              <Button outerFunction={() => {}} type={true} name='Add Car'/>
            </div>
            <div className='orderWithConfigurationDetails-details'>
              <div className='orderWithConfigurationDetails-details-order'>
                <div className='orderWithConfigurationDetails-details-header'>
                    Order Configuration
                    <div className='orderWithConfigurationDetails-details-header-label'>
                      #00081023123
                    </div>
                </div>
                <div className='orderWithConfigurationDetails-details-order-body'>
                  { [...specs || []].map((pair:any, index:number) => {
                    return <div key={index} className='keyValuePair'>
                            { pair[0] } : { pair[1] }
                          </div>
                  })}
                </div>
              </div>
              <div className='orderWithConfigurationDetails-details-client'>
                <div className='orderWithConfigurationDetails-details-header'>
                    Client
                    <div className='orderWithConfigurationDetails-details-header-label'>
                      #00081023123
                    </div>
                </div>
                <div className='orderWithConfigurationDetails-details-client-body'>
                  Name: { orderConfiguration?.client?.name } { orderConfiguration?.client?.surName }
                </div>
              </div>
            </div>
            <div className='orderWithConfigurationDetails-cars'>
                  <div className='orderWithConfigurationDetails-cars-header'>
                    Cars
                  </div>
                  <div className='orderWithConfigurationDetails-cars-items'>
                      { orderConfiguration?.cars?.map((car:CarType) => {
                        return(
                          <CarCard car={car}/>
                        )
                      }) }
                  </div>
            </div>
          </div>
    </div>
   
  )
}

export default OrderWithConfigurationDetails;