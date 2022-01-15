import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './locationInput.scss'
import { rangeMock  } from '../../../utils/constants/rangeMock';

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
        <div className='locationInput-range' onClick={handleClick}>{ range? range : 'Range'  } <ArrowDropDownIcon fontSize='large' />
         <div  className={`${isShown?'visible ': 'hidden'} locationInput-range-dropDown`}>
            { rangeMock.map((option:{id:number, name:string}) => {
              return(
                <div key={option.id} onClick={()=>{
                  handleRangeOptionClick(option)
                }} className='customSelect-options-item'>{option.name}</div>
              )
            }) }
         </div>
         </div>
       

       </div>
       
    </div>
  )
}

export default LocationInput