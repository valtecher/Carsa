import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import CarCard from '../../../components/Cards/CarCard/CarCard';
import Button from '../../../components/common/button/Button';
import DropDown from '../../../components/common/dropdown/DropDown';
import TextInput from '../../../components/common/input/TextInput';
import Header from '../../../components/header/Header';
import { fetchCarByLink } from '../../../utils/apis/CarScapperApi';
import { addCarToConfiguration } from '../../../utils/apis/OrderApi';
import { CarType } from '../../../utils/models/Car';
import './addCarConfiguration.scss';

export interface manualConfiguration {
  
  type?: string,  
  brand?: string, 
  model?: string, 
  generation?: string, 
  fuel?: string, 
  gearbox?: string, 
  drive?: string, 
  doors?: string,
  price_from?: string, 
  price_until?: string, 
  year_from?: string, 
  year_until?: string, 
  milage_from?: string, 
  milage_until?: string, 
  volume_from?: string, 
  volume_until?: string, 
  power_from?: string, 
  power_until?: string, 

}

const mockBrands = [ { id: 1, label: 'Volkswagen', name: 'brand' } ]

interface IAddCarConfigurationProps {
  showHeader?:boolean;
  mode?:boolean;
  onSubmit?: (form:any) => void
}

const AddCarConfiguration = (props:IAddCarConfigurationProps) => {

  const { showHeader, mode, onSubmit } = props;

  const navigate = useLocation();
  const [ link, setLink ] = useState<string>('')
  const [ fetchedCar, setFetchedCar ] = useState<CarType>();
  const [ manualConfiguration, setManualConfiguration ] = useState<manualConfiguration>()

  const handleLinkChange = (e:any) => {
    setLink(e.target.value)
  }

  const handleFetchCarLink = async () => {
    fetchCarByLink(link).then(( res ) => {
      console.log(res);
      setFetchedCar(res);
    })
  }

  const handleDropdownChange = (e:any, placeholder:any) => {
    setManualConfiguration({ ...manualConfiguration, [placeholder.replaceAll(' ', '_')]: e.label  });
  }

  const handleManualConfigurationChange = (e:any) => {
    setManualConfiguration({ ...manualConfiguration, [e.target.name]: e.target.value  });
  }

  const handleReset = () => {
    setFetchedCar(undefined);
  }

  const handleSubmit = () => {
    const res:any = addCarToConfiguration(manualConfiguration ?? fetchedCar! );
    if(onSubmit){
      onSubmit(manualConfiguration ?? fetchedCar!);  
    }
    
    if(res) {

    }

  }

  console.log('Testing: ', manualConfiguration || fetchedCar);

  return(
    <div className='carSelector-add'>
     
     { showHeader ?  <div className='carSelector-add-header'>
            <Header/> 
      </div> : ''}
      <div className='carSelector-add-body'>
          <div className='carSelector-add-body-label'>Add Car</div>
          <div className='carSelector-add-body-wrapper'>
         
          { !fetchedCar && 
           <div className='carSelector-add-body-manual carSelector-add-body-paper'>
             <div className='carSelector-add-body-paper-label'>
                Add Manually 
              </div>
              <div className='carSelector-add-body-manual-body'>
                <DropDown placeholder='Body type' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Brand' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Model' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Generation' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Fuel type' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Gearbox' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Drive' options={mockBrands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Doors' options={mockBrands}  setOuterOptions={handleDropdownChange}/>
                <TextInput className='carSelector-add-body-manual-body-input' name='price_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.price_from} placeholder='Price from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='price_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.price_until} placeholder='Price until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='year_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.year_from} placeholder='Year from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='year_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.year_until} placeholder='Year until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='milage_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.milage_from} placeholder='Milage from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='milage_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.milage_until} placeholder='Milage until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='volume_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.volume_from} placeholder='Engine Volume from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='volume_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.volume_until} placeholder='Engine Volume until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='power_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.power_from} placeholder='Power from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='power_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.power_until} placeholder='Power until'/>
             
              </div>
            </div>
          }
          
          { !fetchedCar && <div className='carSelector-add-body-link carSelector-add-body-paper'>
            <div className='carSelector-add-body-paper-label'>
                Add By Link 
            </div>
            <div className='carSelector-add-body-paper-body'>
              <TextInput value={link} placeholder={'Enter link'} onChange={handleLinkChange}></TextInput>
              <div className='carSelector-add-body-paper-body-submit'>
                <Button onClick={() => { handleFetchCarLink()}} name={'Fetch'} type={false}></Button>
              </div>
            </div>
          
          </div>}
          { fetchedCar && <CarCard defaultExpended={true} car={fetchedCar} /> }
          </div>
      </div>
      <div className='carSelector-add-submit'>
         { fetchedCar && <Button name={'Reset'} onClick={handleReset} type={true}/>} 
         <Button name={'Submit'} onClick={handleSubmit} type={true}/> 
      </div>
    </div>
  )
}

export default AddCarConfiguration;