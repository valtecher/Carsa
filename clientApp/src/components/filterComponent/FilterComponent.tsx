import React, {useState, useEffect} from 'react'
import './filter.scss'
import CustomSelect from '../shared/select/CustomSelect'
import RangeSelect from '../shared/rangeSelect/RangeSelect'
import { useSelector } from 'react-redux';
interface Props {
  filter: (options:any, rangeOptions:any) => void
}

const FilterComponent = ({filter}:Props) => {
  const brands = useSelector((state:any) => {return state.cars.brands})

  const [ options, setOptions ]  = useState([{id: '0', name: 'Audi'}, {id: '1', name: 'Volkswagen'}])
  const [ optionsModel, setModelOptions ]  = useState([])
  const [ optionsGearBox, setOptionsGearBox ]  = useState([{id: '0', name: 'DSG'}, {id: '1', name: 'Manual'}])
  const [ fuelTypeOptions, setFuelTypesOptions ]  = useState([{id: '0', name: 'Petrol'}, {id: '1', name: 'Diesel'}])
  const [ filterOptions, setFilterOptions ] = useState({})
  const [rangeOptions, setRangeOptions ] = useState({})

  useEffect(()=> {
    
  }, [brands]) 

  return(
    <div className='filterWrapper'>
        <CustomSelect options={brands} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Brand' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={optionsModel} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Model' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={optionsGearBox} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Gearbox' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={fuelTypeOptions} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Fuel Type' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={options} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Drive' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={options} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Genereation' onChange={()=>{}}></CustomSelect>
        <CustomSelect options={options} filterOptions={filterOptions} setFilterOptions={setFilterOptions} title='Location' onChange={()=>{}}></CustomSelect>
        <RangeSelect  ranges={rangeOptions} setRanges={setRangeOptions} title='EngineVolume'></RangeSelect>
        <RangeSelect  ranges={rangeOptions} setRanges={setRangeOptions} title='Power'></RangeSelect>
        <RangeSelect  ranges={rangeOptions} setRanges={setRangeOptions} title='Milage'></RangeSelect>
        <button className='filterWrapper-filter' onClick={()=>{
          filter(filterOptions, rangeOptions)
        }}>Filter</button>
    </div>
  )
}

export default FilterComponent