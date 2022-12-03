import './CarSelectorDashboard.scss'
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import Header from '../../../components/header/Header';
import ConfigurationCard from '../../../components/Cards/ConfigurationCard/ConfigurationCard';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';
import { useEffect, useState } from 'react';
import { getConfigurationsForSelector } from '../../../utils/apis/ConfigurationApi';

const CarSelectorDashboard = () => {

  const user = useSelector((state:AppState) => state.user.user );
  const [configurations, setConfigurations ] = useState<Array<IConfiguration>>([]);

  useEffect(() => {
    getConfigurationsForSelector().then((confs) => {
      setConfigurations([...confs])
    });
  }, [])


  return (
    <div className='carSelector-dashboard' >
      <Header/>
    <div className='carSelector-dashboard-header'>
        <p className='carSelector-dashboard-header-label'>Dashboard</p>
        <p className='carSelector-dashboard-header-user'> Hello, { user?.first_name }</p>
      </div>
      <div className='carSelector-dashboard-configurations'>
        {configurations.map((Configuration) => {
          const order = { id: Configuration.id, Configuration, type: 'Configuration' }
          return(
            <ConfigurationCard configuration={order}/>
          )
        })}
      
      </div>
    </div>
  )
}

export default CarSelectorDashboard;