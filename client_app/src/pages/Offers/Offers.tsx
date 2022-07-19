import { useEffect, useState } from 'react'
import './Offers.scss';
import Header from "../../components/header/Header";
import ArteonImg from '../../images/HomePage/arteon.png'
import DropDown from '../../components/common/dropdown/DropDown';
import RangeSelect from '../../components/common/range/RangeSelect';
import Button from '../../components/common/button/Button';
import axios from 'axios'
import { CarType } from '../../utils/models/Car';
import OffersCarCard from '../../components/Cards/OfferCarCard/OffersCarCard';
import { getAllGenerations, getAllModels, filterCars } from '../../utils/services/CarService'
import {carType, fuelType } from '../../utils/constants/CarConstants';
import { filterCar } from '../../utils/services/FilterCarService';

const OffersPage = () =>  {
  const sample = [{ id: 0, label: 'test1' }, { id: 1, label: 'test2' }, { id: 2, label: 'test3'}]
  const [ cars, setCars ] = useState<Array<CarType>>([])
  const [ filteredCars, setFilteredCars ] = useState<Array<CarType>>(cars)
  const [ brands, setBrands ] = useState([])
  const [ models, setModels ] = useState([])
  const [ generations, setGenerations ] = useState([])
  const [filterOptions, setFilterOptions] = useState({
    type: null,
    brand: null,
    model: null, 
    generation: null, 
    fuelType: null, 
    pricefrom: null, 
    priceuntil: null, 
    milagefrom: null, 
    milageuntil: null, 
    yearfrom: null, 
    yearuntil: null,
    powerfrom:null,
    poweruntil:null,
  })

  const filterOption = (option:any, field: string) => {
    setFilterOptions({...filterOptions, [field]:option.label? option.label : option.name})
  }

  const rangeOptions = (fieldName:string, value: string ) => {
    setFilterOptions({...filterOptions, [fieldName]: value})
  }

  const handleResetClick = () => {
    setFilterOptions({ type: null,
      brand: null,
      model: null, 
      generation: null, 
      fuelType: null, 
      pricefrom: null, 
      priceuntil: null, 
      milagefrom: null, 
      milageuntil: null, 
      yearfrom: null, 
      yearuntil: null,
      powerfrom:null,
      poweruntil:null,
    })

      setFilteredCars(cars)
  }
  const handleFilterClick = () => {
    let filter:any = filterOptions;
    Object.keys(filter).forEach(key => {
      if (filter[key] === null) {
        delete filter[key];
    }
    });
    const filteredCars = cars.filter((car) => {
      return filterCar(car, filter);
    })

    setFilteredCars(filteredCars)
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/cars`).then((res:any) => {
      setCars(res.data)
      setFilteredCars(res.data)
    });
    axios.get(`${process.env.REACT_APP_API_URL}/cars/brands`).then((res:any) => {
      setBrands(res.data)
    });
  }, [])

  useEffect(() => {
    setFilterOptions({...filterOptions, model: null, generation: null})
  }, [filterOptions.brand])

  useEffect(() => {
    if(filterOptions.brand !== null){
      getAllModels(filterOptions.brand).then((res) => {
        setModels(res.data)
      });
    }
    if(filterOptions.model !== null){
      getAllGenerations(filterOptions.model).then((res) => {
        setGenerations(res.data)
      })
    }
  }, [filterOptions])

  return(
    <div className='offers'>
      <Header/>
      <div className='offers-wrapper'>
        <div className='offers-wrapper-filter'>
          <div className='offers-wrapper-filter-form'>
            <DropDown placeholder='type' options={carType} setOuterOptions={filterOption}></DropDown>
            <DropDown outerOption={filterOptions} setOuterOptions={filterOption} placeholder='brand' options={[...brands || []]}></DropDown>
            <DropDown setOuterOptions={filterOption} placeholder='model' options={[...models || []]}></DropDown>
            <DropDown setOuterOptions={filterOption} placeholder='generation' options={[...generations|| []]}></DropDown>
            <DropDown setOuterOptions={filterOption} placeholder='fuelType' options={fuelType}></DropDown>
            <RangeSelect setOutsideOptions={rangeOptions} name={'price'}/>
            <RangeSelect setOutsideOptions={rangeOptions} name={'milage'}/>
            <RangeSelect setOutsideOptions={rangeOptions} name={'year'}/>  
            <RangeSelect setOutsideOptions={rangeOptions} name={'power'}/>  
            <Button name={'Filter'} type={true} onClick={handleFilterClick} ></Button>
            <Button name={'Reset'} type={true} onClick={handleResetClick} ></Button>
          </div>
          <div className='offers-wrapper-filter-image'>
            <img src={ArteonImg}></img>
          </div>
        </div>
        <div className='offers-wrapper-cars'>
          { [...filteredCars || []].map((car:CarType, index:number) => {
            return(
              <div key={index}>
                <OffersCarCard car={car}/>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  )
}

export default OffersPage;