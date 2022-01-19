import  { useEffect, useState } from 'react'
import './ConfigurationCreator.scss'
import Paper from '../../shared/Papper/Papper';
import TextField from '@mui/material/TextField';
import Carousel from '../../carousel/Carousel'
import CarSpecPresentation from '../../carSpecsPresentation/CarSpecPresentation';
import { MetroSpinner } from 'react-spinners-kit'
import { Package, PackageType } from '../../../interfaces/models/package';
import { scrapperApi } from '../../../services/scrapper/scrapperApi'
import { CarType } from '../../../interfaces/models/car';
import { getAllCarBrands, getAllCarModelsWithBrand, getAllCarGenerations } from '../../../services/car/carService'
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { CarBrandType } from '../../../interfaces/models/carBrand';
import CustomSelect from '../../shared/CustomSelect/CustomSelect';
import { typeMock, fuelTypeMock, gearboxTypeMock, driveTypeMock } from '../../../utils/constants/carMock'
import RangeSelect from '../../shared/rangeSelect/RangeSelect'
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
      var matches = link.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      var domain = matches && matches[1]; 
      if( domain && domain === 'www.otomoto.pl' ){
        handleLoading(true);
        const fetchedCar = await scrapperApi.getScrappedModel(link, handleLoading)
        setScrapedCar(fetchedCar);
      } else {
        alert('You should enter only otomoto links')
      }

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
          
          setGenerations(res.data)
        })
      }
    }
  let tmpFilled = true;
  Object.values(configuration).map((value: string | number) => {
    if(value === '' || value === 0 ){
      tmpFilled = false;
    }
  })
  setIsFilled(tmpFilled)
  }, [configuration])

 

  const handleLocationChange = (e:any) => {
    setConfiguration({...configuration, location: e.target.value});
  }

  const handleRangeChange = (e:any) => {
    setConfiguration({ ...configuration, range: e })
  } 

  console.log(configuration)
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
                  const carBrandIndex = [...brands || []].findIndex((brand:any) => {
                    return  brand.name === configuration.CarBrand
                  })
                  const carModelIndex = [...models || []].findIndex((model: any) =>{
                    return model.name === configuration.CarModel
                  })

                  const carGenerationIndex = [ ...generations || [] ].findIndex((generation:any) => {
                    console.log( generation.name,  configuration.CarGeneration , generation.name == configuration.CarGeneration);
                    return generation.name == configuration.CarGeneration
                  })
                  console.log(carGenerationIndex)
                  const CarBrand:any = { ...brands?.[carBrandIndex] || { }}
                  const CarModel:any = { ...models?.[carModelIndex] || {} }
                  CarModel.CarBrand = { ...CarBrand}; 
                  const CarGeneration:any = { ...generations?.[carGenerationIndex] || {}}
                  CarGeneration.CarModel = {...CarModel}
                  
                  console.log(CarGeneration)
                  setConfiguration({...configuration, CarBrand: brands?.[carBrandIndex] || '', CarModel: models?.[carModelIndex] || '', CarGeneration: CarGeneration, brand_id: CarBrand.id, model_id: CarModel.id, generation_id: CarGeneration.id });
                  const newConf = {...configuration, CarBrand: brands?.[carBrandIndex] || '', CarModel: models?.[carModelIndex] || '', CarGeneration: CarGeneration, brand_id: CarBrand.id, model_id: CarModel.id, generation_id: CarGeneration.id }
                  console.log('New Configuration: ', newConf);
                  next(newConf)
                }
                }
                }
                 className={`configurationCreator-buttons-btn ${isFilled? '' : 'disabledBtn' }`}>Continue</div>
            </div>
        </div>
        }
      </Paper>
    </div>
  )
}

export default ConfigurationCreator;