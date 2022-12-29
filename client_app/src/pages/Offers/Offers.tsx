import { useEffect, useState } from 'react'
import './Offers.scss';
import Header from "../../components/header/Header";
import ArteonImg from '../../images/HomePage/arteon.png'
import DropDown from '../../components/common/dropdown/DropDown';
import RangeSelect from '../../components/common/range/RangeSelect';
import Button from '../../components/common/button/Button';
import axios from 'axios'
import { CarType } from '../../utils/models/Car';
import { getAllGenerations, getAllModels, filterCars } from '../../utils/services/CarService'
import {carType, fuelType } from '../../utils/constants/CarConstants';
import { filterCar } from '../../utils/services/FilterCarService';
import { getAllModelsForBrand, getRejectedCars } from '../../utils/apis/CarsApi';
import CarCard from '../../components/Cards/CarCard/CarCard';

const OffersPage = () =>  {
  const [ cars, setCars ] = useState<Array<CarType>>([]);
  const [ filters, setFilters ] = useState<any>();
  const [ filteredCars, setFilteredCars ] = useState<Array<CarType>>(cars)
  const [ brands, setBrands ] = useState([])
  const [ models, setModels ] = useState([])
  const [ generations, setGenerations ] = useState([])


  const handleFilterEditing = (option:any, placeholder:string) => {
    setFilters({...filters, [placeholder]: option.name})
  }

  const handleFilter = () => {
    console.log(filters);  
    const filteredCars  = cars.filter((car) => {
      let flag = true;
      const entries = Object.entries(filters);
      console.log(Object.entries(car).flat(2), Object.entries(filters));
    })
  }

  useEffect(() => {
    if (filters?.brand) {
      getAllModelsForBrand(filters.brand).then((res:any) => {
        setModels(res);
      });
    }
  }, [filters])

  useEffect(() => {
    getRejectedCars().then((res) => {
      setCars(res.rejectedCars);
      setFilteredCars(res.rejectedCars);
    });
    
    axios.get(`${process.env.REACT_APP_API_URL}/cars/brands`).then((res:any) => {
      setBrands(res.data)
    });

  }, [])

  return(
    <div className='offers'>
      <Header/>
      <div className='offers-wrapper'>
        <div className='offers-wrapper-filter'>
          <div className='offers-wrapper-filter-form'>
              <DropDown placeholder='brand' options={brands} setOuterOptions={handleFilterEditing}></DropDown>
              <DropDown placeholder='model' options={models} setOuterOptions={handleFilterEditing}></DropDown>
              <Button type={true} name="Filter" onClick={handleFilter}></Button>
          </div>
          <div className='offers-wrapper-filter-image'>
            <img src={ArteonImg}></img>
          </div>
        </div>
        <div className='offers-wrapper-cars'>
          { [...filteredCars || []].map((car:CarType, index:number) => {
            return(
              <div key={index}>
                <CarCard car={car}></CarCard>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  )
}

export default OffersPage;