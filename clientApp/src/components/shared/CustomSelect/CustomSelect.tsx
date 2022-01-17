import React, { useState, useEffect } from 'react';
import './CustomSelect.scss';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

const CustomSelect  = ({className = '', disabled = false, title, options, setFilterOptions, filterOptions}:Props) => {

  const [isShown, setIsShown] = useState(false)
  const [ value, setValue ] = useState({id: -1, name: 'Select one...'});

 

  const handleClick = (e:any) => {
    if( !disabled ) {
      setIsShown(!isShown);
    } else { 

    }
  }

  const handleOptionClick = (option:Option) => {
    setValue(option)
    if(setFilterOptions){
      setFilterOptions({...filterOptions, [title]: option.name})
    }
    setIsShown(false)
  }

  return(
    <div className={`customSelect ${ className }`}>
        <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">{ title }</InputLabel>
        <Select
          name={ title }
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value.name}
          label={title}
          disabled={disabled}
        >
         { options.map((option:any) => {
           return(
            <MenuItem onClick={() => {  handleOptionClick(option)}} key={option.id} value={option.name}>{ option.name }</MenuItem>
           )
         }) }
        </Select>
      </FormControl>
    </div>
  )
}

export default CustomSelect