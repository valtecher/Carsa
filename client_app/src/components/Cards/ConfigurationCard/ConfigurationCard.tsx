import { useState, useEffect } from 'react'
import { flattenObject } from '../../../utils/helpers/flattenObject';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { bannedKeys } from '../../../utils/constants/BannedKeys';
import Button from '../../common/button/Button';
import './configurationCard.scss';

interface IConfigurationCardProps {
  configuration: any
}

const ConfigurationCard = (props: IConfigurationCardProps) => {
  const { configuration } = props;
  const [specs, setSpecs ] = useState<any>();
  const navigate = useNavigate();
  const user = useSelector((state:AppState) => state.user.user )

  useEffect(() => {
    setSpecs(Object.entries(flattenObject(configuration.Configuration) || configuration?.car_order?.[0] || {}))
}, [])

  return(
    <div className='configurationCard'>
      <div className='configurationCard-part'>
        <div className='configurationCard-type'>{ configuration?.type  } { configuration.Configuration?.CarBrand?.name } { configuration.Configuration?.CarModel?.name } { configuration.Configuration?.CarGeneration?.name }</div>
        <div className='configurationCard-client'>{ configuration.Client?.first_name } { configuration.Client?.last_name }</div>
        <div className='configurationCard-id'> { configuration.id } </div>
      </div>
      <div className='configurationCard-separator'></div>
      <div className='configurationCard-part configurationCard-part-specs'>
        { [...specs || []].map(([key, value]:any, index:number) => {
          const isKeyBanned:boolean = bannedKeys.some((element) => key === element)
          return(
          (isKeyBanned ? '' : <div key={index} className='configurationCard-specs'>
                                { key?.replaceAll('_', ' ')  }: { value } 
                              </div>)  
          )
        }) }
      </div>
      <div className='configurationCard-separator'></div>
      <div className='configurationCard-part'>
        {user?.role !== 'CarSelector' ? <Button onClick={() => { navigate(`/order/details/${configuration.id}`) }} name={'Details'} type={false} /> : '' }
        { user?.role !== 'Client' ? <Button onClick={() => { navigate(`/carselector/car/add/${configuration.Configuration?.id}`) }} name={'Add Car'} type={false} /> : '' }
      </div>
    </div>
  )
}

export default ConfigurationCard; 