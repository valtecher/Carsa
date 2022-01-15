import  { useEffect, useState } from 'react'
import './ConfigurationCreator.scss'
import Paper from '../../shared/Papper/Papper';
import TextField from '@mui/material/TextField';
import Carousel from '../../carousel/Carousel'
import CarSpecPresentation from '../../../components/carSpecsPresentation/CarSpecPresentation';
import { MetroSpinner } from 'react-spinners-kit'
import { Package, PackageType } from '../../../interfaces/models/package';
import { scrapperApi } from '../../../services/scrapper/scrapperApi'
import { CarType } from '../../../interfaces/models/car';
import { getAllCarBrands, getAllCarModelsWithBrand, getAllCarGenerations } from '../../../services/car/carService'
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { CarBrandType } from '../../../interfaces/models/carBrand';
import CustomSelect from '../../shared/select/CustomSelect';
import { typeMock, fuelTypeMock, gearboxTypeMock, driveTypeMock } from '../../../utils/constants/carMock'
import RangeSelect from '../../../components/shared/rangeSelect/RangeSelect'
import LocationInput from '../../shared/locationInput/LocationInput';


interface Props {
  type: PackageType | Package | null
  next: ( answer:any ) => void
}

const ConfigurationCreator = ({ next, type }:Props) => {
  const [ isLinkType, setIsLinkType ] = useState<boolean>(type === PackageType.SINGLE_CAR) 
  const [ link, setLink ] = useState<string>()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ scrapedCar, setScrapedCar] = useState<CarType | null>(null)

  const [ brands, setBrands ] = useState(null);
  const [ models, setModels ] = useState(null);
  const [ generations, setGenerations ] = useState(null);
  const [ isFilled, setIsFilled ] = useState(false);

  const [configuration, setConfiguration] = useState<CarConfigurationType>({
    CarBrand: '',
    CarModel: '',
    CarGeneration: '', 
    year_from: 0, 
    year_until: 0,
    engine_volume_from: 0, 
    engine_volume_until: 0, 
    price_from:  0, 
    price_until: 0, 
    type: '', 
    transmission: '', 
    mileage_from: '',
    mileage_until: '',
    location: '', 
    fuel_type: '',
    drive: '',
    range: '',
  });

  const handleLinkChange = (event:any) => {
    setLink(event.target.value)
  }

  const handleLoading = (value:boolean) => {
      setIsLoading(value);
  }

  const handleScrappedCar = async () => {
    if (link) {
      const fetchedCar = await scrapperApi.getScrappedModel(link, handleLoading)
      setScrapedCar(fetchedCar);
      console.log(fetchedCar);
    }
  } 

  useEffect(() => {
      getAllCarBrands().then((res:any) => {
      setBrands(res.data)
    })
  }, [])

  useEffect(() => {
    if( configuration.CarBrand !==  ''){
      getAllCarModelsWithBrand(configuration.CarBrand as string || '').then((res:any) => {
        setModels(res.data)
      }) 

      if(configuration.CarModel !== ''){
        getAllCarGenerations(configuration.CarModel as string || '').then((res:any) => {
          
          console.log('Generations: ',res)
          setGenerations(res.data)
        })
      }
    }
  let tmpFilled = true;
  Object.values(configuration).map((value: string | number) => {
    if(value === '' || value === 0){
      console.log('Value: ', value);
      tmpFilled = false;
    }
  })
  setIsFilled(tmpFilled)
  }, [configuration])

  console.log(configuration)

  const handleLocationChange = (e:any) => {
    setConfiguration({...configuration, location: e.target.value});
  }

  const handleRangeChange = (e:any) => {
    setConfiguration({ ...configuration, range: e })
  } 

  return (
    <div className='configurationCreator'>
      <Paper size='xla'>
        { isLinkType?  
        <div>
          <div className='configurationCreator-header'>
            Add Link to your car
          </div>
          <div className='configurationCreator-body'>
            <div className='configurationCreator-body-inputWrapper'>
              <label>
                <p>Provide us link to your car:</p>
                <TextField id="Standard" variant='standard' value={link} onChange={handleLinkChange} name='link' className='' type='text' placeholder='Link to car selling web site'></TextField>
              </label>
            </div>
            <div className={`configurationCreator-body-btn ${isLoading? 'loadingBtn' : ''} ${ scrapedCar? 'disabledBtn' : '' }`} onClick={() => {
              if(link && !scrapedCar){
                handleLoading(true);
                handleScrappedCar();
              }
              }}> { isLoading ? <div className={`createConfiguration-loader`}><MetroSpinner size={25} color="#fff" loading={isLoading} /></div> : 'Proceed' }</div>
            <div className='configurationCreator-body-carousel'>
              <Carousel images={scrapedCar?.images || []}></Carousel>   
            </div>
            <div className='configurationCreator-body-presentation'>
              { scrapedCar? <CarSpecPresentation car={scrapedCar}/> : '' }
             </div>
          </div>
          <div className='configurationCreator-buttons'>
            <div className={`configurationCreator-buttons-btn ${scrapedCar? 'activeRetryBtn' : 'disabledBtn' }`} onClick={() => {
              setScrapedCar(null)
            }}>Retry</div>
            <div onClick={() => {
              if(scrapedCar){
                next(scrapedCar)
              }
            }} className={`configurationCreator-buttons-btn ${scrapedCar? '' : 'disabledBtn' }`}>Continue</div>
            
          </div>
        </div>
        : 
        <div>
          <div className='configurationCreator-header'>
            Configure your dream car
          </div>
          <div className='configurationCreator-panel'>
            <CustomSelect options={brands || []}  title='CarBrand' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect className={`${ configuration.CarBrand !== ''? '' : 'disabled'  }`} disabled={configuration.CarBrand === ''} options={models || []}  title='CarModel' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect className={`${ configuration.CarModel !== ''? '' : 'disabled'  }`} disabled={configuration.CarModel === ''} options={generations || []}  title='CarGeneration' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect options={typeMock || []}  title='type' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect options={fuelTypeMock || []}  title='fuel_type' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect options={gearboxTypeMock || []}  title='transmission' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <CustomSelect options={driveTypeMock || []}  title='drive' filterOptions={configuration} setFilterOptions={setConfiguration} onChange={()=>{}}></CustomSelect>
            <RangeSelect  ranges={configuration} setRanges={setConfiguration} title='engine_volume'></RangeSelect>
            <RangeSelect  ranges={configuration} setRanges={setConfiguration} title='price'></RangeSelect>
            <RangeSelect  ranges={configuration} setRanges={setConfiguration} title='mileage'></RangeSelect>
            <RangeSelect  ranges={configuration} setRanges={setConfiguration} title='year'></RangeSelect>
            <LocationInput range={configuration.range || ''} handleRangeChange={handleRangeChange} location={configuration.location} handleLocationChange={handleLocationChange} title='location'></LocationInput>
          </div>
          <div className='configurationCreator-buttons'>
            <div onClick={() => {
                if(isFilled){
                  next(configuration)
                }
                }} className={`configurationCreator-buttons-btn ${isFilled? '' : 'disabledBtn' }`}>Continue</div>
            </div>
        </div>
        }
      </Paper>
    </div>
  )
}

export default ConfigurationCreator;