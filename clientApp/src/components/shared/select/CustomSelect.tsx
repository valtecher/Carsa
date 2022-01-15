import React, { useState, useEffect } from 'react';
import './customSelect.scss';


interface Props{
  options: Array<Option>
  title: string
  onChange?: () => void
  setFilterOptions?: any
  filterOptions?: any
  className?: string
  disabled?: boolean
}

interface Option{
  id: string | number | any,
  name: string
}

const CustomSelect  = ({className, disabled = false, title, options, setFilterOptions, filterOptions}:Props) => {

  const [isShown, setIsShown] = useState(false)
  const [ value, setValue ] = useState({id: -1, name: 'Select one...'});
  const [ localFilterOptions, setLocalFilterOptions ] = useState()
 

  const handleClick = (e:any) => {
    if( !disabled ) {
      setIsShown(!isShown);
    } else { 
      console.log('else: ', disabled)
    }
  }

  const hanleOptionClick = (option:Option) => {
    setValue(option)
    if(setFilterOptions){
      setFilterOptions({...filterOptions, [title]: option.name})
    }
    setIsShown(false)
  }

  return(
    <div className={`customSelect ${ className }`}>
      <div className='customSelect-label'>{title}</div>
      <div className='customSelect-display' onClick={handleClick}>{value.name}</div>
      <div className={`${isShown?'visible ': 'hidden '}customSelect-options`}>
        {options.map((option:{id:string, name:string})=> {
          return(
            <div key={option.id} onClick={()=>{
              hanleOptionClick(option)
            }} className='customSelect-options-item'>{option.name}</div>
          )
        })}

      </div>
    </div>
  )
}

export default CustomSelect