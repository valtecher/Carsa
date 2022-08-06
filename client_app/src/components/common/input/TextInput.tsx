import { type } from "os"
import { useState, useEffect } from "react"
import './TextInput.scss'
interface IProps{
  onChange?: (e:any) => void,
  placeholder?:string,
  value: any, 
  name?: string,
  error?: any,
  type?: string,
  className?: string,
}


const TextInput = ({placeholder, value, className, onChange, error, name, type = 'text',}:IProps) => {

  return(
    <div className={`textInput ${className} ${error?  'input-error' : ''}`}>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type}></input>
      { error?.hasError? <div className='input-error-message'>{ error?.message }</div> : '' }
    </div>
  )
}

export default TextInput