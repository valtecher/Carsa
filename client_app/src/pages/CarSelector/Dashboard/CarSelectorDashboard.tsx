import './CarSelectorDashboard.scss'
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import Header from '../../../components/header/Header';
import ConfigurationCard from '../../../components/Cards/ConfigurationCard/ConfigurationCard';
import { IConfiguration } from '../../../utils/models/OrderWithConfiguration';

const CarSelectorDashboard = () => {

  const user = 'Dawid';
  const configurations:Array<IConfiguration> = [ {id: '#691697139123', type: 'Configuration', specs: {id: '#68323243', brand: 'Volkswagen', model: 'Golf', generation: '8', year: '2019-', price: '21232-76542', engine: {id: '#86e2324',power: '122-160', fuel: 'ON',  volume: '1200-1800'}, doors: '3-5', gearbox: 'Auto' },  client: { id: '#8080123312' , name: 'Michael', surName: 'Kors', }},
  {id: '#691697139124', type: 'Configuration', specs: {id: '#1080880012', brand: 'Ford', model: 'Mondeo', generation: 'MK4', year: '2007-2014', price: '21232-76542', engine: {id: '#7123312', power: '130-', fuel: 'ON',  volume: '1900-2400'}, doors: '5', gearbox: 'Manual' },  client: { id: '#8080123312' , name: 'Daniel', surName: 'Stuck', }}
];


  return (
    <div className='carSelector-dashboard' >
      <Header/>
      <div className='carSelector-dashboard-header'>
        <p className='carSelector-dashboard-header-label'>Dashboard</p>
        <p className='carSelector-dashboard-header-user'> Hello, { user }</p>
      </div>
      <div className='carSelector-dashboard-configurations'>
        {configurations.map((configuration) => {
          return(
            <ConfigurationCard configuration={configuration}/>
          )
        })}
      
      </div>
    </div>
  )
}

export default CarSelectorDashboard;