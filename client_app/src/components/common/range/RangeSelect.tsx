import { ChangeEvent, useState } from 'react'
import './RangeSelect.scss'

interface IProps {
  name:any
  setOutsideOptions: any;
}

const RangeSelect = (props:IProps) => {
  const {name, setOutsideOptions} = props;
  const [ inputValue, setInputValue ] = useState<{ from: string, until: string }>({ from: '', until: '' })

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.name.includes('from')){
      setInputValue({...inputValue, from: e.target.value.replace(/\D/g, '')})
    } else {
      setInputValue({...inputValue, until: e.target.value.replace(/\D/g, '')})
    }
    if(setOutsideOptions){
      setOutsideOptions(e.target.name, e.target.value);
    }
  }


  return(
    <div className='rangeselect'>
      <div className='rangeselect-wrapper'>
        <input placeholder={`${name} from`} value={inputValue.from} name={`${name}from`} className='rangeselect-wrapper-input' onChange={handleChange}></input>
        <div><span className='material-icons'>arrow_right_alt</span></div>
        <input placeholder={`${name} until`} value={inputValue.until} name={`${name}until`} className='rangeselect-wrapper-input' onChange={handleChange}></input>
      </div>
    </div>
  )
}

export default RangeSelect;