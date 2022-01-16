import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './locationInput.scss'
import { rangeMock  } from '../../../utils/constants/rangeMock';
import CustomSelect from '../CustomSelect/CustomSelect';

interface Props {
  title: string,
  handleLocationChange: any,
  location: string
  range:string,
  handleRangeChange:any
}

const LocationInput = ({title, handleLocationChange, location, range, handleRangeChange }:Props) => {
  const [isShown, setIsShown] = useState(false)

  

  const handleClick = (e:any) => {
      setIsShown(!isShown);
  
  }
  const handleRangeOptionClick = (option:{id: number, name: string}) => {
      setIsShown(!isShown)
      handleRangeChange(option.name);
  }

  return(
    <div className='locationInput'>
       <div className='locationInput-label'>{title}</div>
       <div className='locationInput-group'>
        <input className='locationInput-display' onChange={handleLocationChange} value={location} placeholder='Location...'></input>
        <div className='locationInput-range' onClick={handleClick}>
         <CustomSelect className='locationCustomSelect'  options={rangeMock || []}  title='CarBrand' filterOptions={range} setFilterOptions={handleRangeChange} ></CustomSelect>
         </div>
       

       </div>
       
    </div>
  )
}

export default LocationInput