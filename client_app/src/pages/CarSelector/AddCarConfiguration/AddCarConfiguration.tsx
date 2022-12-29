import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '../../../components/common/button/Button';
import DropDown from '../../../components/common/dropdown/DropDown';
import TextInput from '../../../components/common/input/TextInput';
import Header from '../../../components/header/Header';
import { getAllModelsForBrand, getAllGenerationsForModel, getAllBrands } from '../../../utils/apis/CarsApi';
import { uuid } from '../../../utils/helpers/uuid';
import { CarBrandType } from '../../../utils/models/CarBrand';
import { CarModelType } from '../../../utils/models/CarModel';
import './addCarConfiguration.scss';
import { bodyTypes, doorsTypes, driveTypes, fuelTypes, gearboxTypes } from './constants';

export interface manualConfiguration {
  
  type?: string,  
  Brand?: string, 
  Model?: string, 
  Generation?: string, 
  fuel?: string, 
  gearbox?: string, 
  drive?: string, 
  doors?: string,
  price_from?: string, 
  price_until?: string, 
  year_from?: string, 
  year_until?: string, 
  mileage_from?: string, 
  mileage_until?: string, 
  engine_volume_from?: string, 
  engine_volume_until?: string, 
  power_from?: string, 
  power_until?: string, 

}

interface IAddCarConfigurationProps {
  showHeader?:boolean;
  mode?:boolean;
  onSubmit?: (form:any) => void
}

const AddCarConfiguration = (props:IAddCarConfigurationProps) => {

  const { showHeader, onSubmit } = props;
  const [ manualConfiguration, setManualConfiguration ] = useState<manualConfiguration>();
  const [brands, setBrands] = useState<Array<any>>([]);
  const [models, setModels] = useState([]);
  const [genrations, setGenerations] = useState([]);

  const handleDropdownChange = (e:any, placeholder:any) => {
    setManualConfiguration({ ...manualConfiguration, [placeholder.replaceAll(' ', '_')]: e.label  });
  }

  const handleManualConfigurationChange = (e:any) => {
    setManualConfiguration({ ...manualConfiguration, [e.target.name]: e.target.value  });
  }

  const handleSubmit = () => {
      onSubmit?.(manualConfiguration);  
  }

  useEffect(() => {
    getAllBrands().then((brands:any) => {
      setBrands(brands?.map((brand:CarBrandType) => {
        return {
          id: uuid(),
          name: brand.name,
          label: brand.name
        }
      }))
    })
    
  }, [])

  useEffect(() => {
    if (manualConfiguration?.Brand) {
      getAllModelsForBrand(manualConfiguration.Brand || '').then((models) => {
        setModels(models?.map((model:CarModelType) => {
          return {
            id: uuid(),
            name: model.name,
            label: model.name
          }
        }));
      });
    }

    if (manualConfiguration?.Model) {
      getAllGenerationsForModel(manualConfiguration.Model || '').then((generations) => {
        setGenerations(generations?.map((generation:CarModelType) => {
          return {
            id: uuid(),
            name: generation.name,
            label: generation.name
          }
        }));
      })
      
    }
  }, [manualConfiguration])

  return(
    <div className='carSelector-add'>
     
     { showHeader ?  <div className='carSelector-add-header'>
            <Header/> 
      </div> : ''}
      <div className='carSelector-add-body'>
          <div className='carSelector-add-body-label'>Add Car</div>
          <div className='carSelector-add-body-wrapper'>

           <div className='carSelector-add-body-manual carSelector-add-body-paper'>
             <div className='carSelector-add-body-paper-label'>
                Add Manually 
              </div>
              <div className='carSelector-add-body-manual-body'>
                <DropDown placeholder='Body type' options={bodyTypes} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Brand' options={brands} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Model' options={models} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Generation' options={genrations} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Fuel type' options={fuelTypes} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Gearbox' options={gearboxTypes} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Drive' options={driveTypes} setOuterOptions={handleDropdownChange}/>
                <DropDown placeholder='Doors' options={doorsTypes}  setOuterOptions={handleDropdownChange}/>
                <TextInput className='carSelector-add-body-manual-body-input' name='price_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.price_from} placeholder='Price from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='price_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.price_until} placeholder='Price until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='year_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.year_from} placeholder='Year from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='year_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.year_until} placeholder='Year until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='mileage_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.mileage_from} placeholder='Milage from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='mileage_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.mileage_until} placeholder='Milage until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='engine_volume_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.engine_volume_from} placeholder='Engine Volume from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='engine_volume_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.engine_volume_until} placeholder='Engine Volume until'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='power_from' onChange={handleManualConfigurationChange} value={manualConfiguration?.power_from} placeholder='Power from'/>
                <TextInput className='carSelector-add-body-manual-body-input' name='power_until' onChange={handleManualConfigurationChange} value={manualConfiguration?.power_until} placeholder='Power until'/>
             
              </div>
            </div>
          </div>
      </div>
      <div className='carSelector-add-submit'>
         <Button name={'800 zl'} onClick={handleSubmit} type={false}/> 
      </div>
    </div>
  )
}

export default AddCarConfiguration;