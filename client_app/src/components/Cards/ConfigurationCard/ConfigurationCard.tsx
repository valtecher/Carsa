import { useState, useEffect } from 'react'
import { flattenObject } from '../../../utils/helpers/flattenObject';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import Button from '../../common/button/Button';
import './configurationCard.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';

interface IConfigurationCardProps {
  configuration: IConfiguration
}

const ConfigurationCard = (props: IConfigurationCardProps) => {
  const { configuration } = props;
  const [specs, setSpecs ] = useState<any>();
  const navigate = useNavigate();
  const user = useSelector((state:AppState) => state.user.user )

  useEffect(() => {
    setSpecs(Object.entries(flattenObject(configuration.specs) || {}))
  }, [])

  return(
    <div className='configurationCard'>
      <div className='configurationCard-part'>
        <div className='configurationCard-type'>{ configuration.type }</div>
        <div className='configurationCard-client'>{ configuration.Client?.first_name } { configuration.Client?.last_name }</div>
        <div className='configurationCard-id'> { configuration.id } </div>
      </div>
      <div className='configurationCard-separator'></div>
      <div className='configurationCard-part configurationCard-part-specs'>
        { [...specs || []].map((specPair:Array<string>, index:number) => {
          const bannedKeys:Array<string> = ['id']
          const isKeyBanned:boolean = bannedKeys.some((element) => specPair[0] === element)
          return(
          (isKeyBanned ? '' : <div key={index} className='configurationCard-specs'>
                                { specPair[0] }: { specPair[1]} 
                              </div>)  
          )
        }) }
      </div>
      <div className='configurationCard-separator'></div>
      <div className='configurationCard-part'>
        <Button onClick={() => { navigate(`/order/details/${configuration.id}`) }} name={'Details'} type={false} />
        { user?.role !== 'Client' ? <Button onClick={() => { navigate('/order/add/configuration') }} name={'Add Car'} type={false} /> : '' }
      </div>
    </div>
  )
}

export default ConfigurationCard; 