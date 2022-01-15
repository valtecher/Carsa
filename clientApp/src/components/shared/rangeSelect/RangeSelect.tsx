import React, { useEffect, useState } from 'react';
import { from , timer, interval, Subject, Observable} from 'rxjs'
import { debounce, throttle, debounceTime, take } from 'rxjs/operators'
import './rangeSelect.scss';


interface Props{
  title:string
  ranges:any
  setRanges:any
}

const RangeSelect  = ({ title, ranges, setRanges }:Props) => {

  const [ value, setValue ] = useState<{from?: string, until?:string}>();
  const from$ = new Subject()
  const until$ = new Subject()
  
  useEffect(()=>{
    setRanges({...ranges, [`${title}_from`]: value?.from, [`${title}_until`]: value?.until})
    

  }, [value])

  useEffect(()=>{
    from$.pipe(debounceTime(500)).subscribe({
      next: (x:any) => { 
        setValue({...value, from: x}) 
      }
    })
    until$.pipe(debounceTime(500)).subscribe({
      next: (x:any) => { 
        setValue({...value, until: x}) 
      }
    })


    return () => {
      from$.unsubscribe();
      until$.unsubscribe();
    }
  })

  const handleChange = (e:any) => {
    if(e.target.name === 'from'){
      from$.next(e.target.value) 
    }else {
      until$.next(e.target.value)
    }
    
  }

  return(
    <div className='rangeSelect'>
      <div className='rangeSelect-label'>{title}</div>
      <div className='rangeSelect-wrapper'>
        <input onChange={handleChange} placeholder='From' name='from' className='rangeSelect-input' maxLength={10} type='text'></input>
        <div className='rangeSelect-delimeter'></div>
        <input onChange={handleChange} placeholder='Until' className='rangeSelect-input' name='until' maxLength={10} type='text'></input>
      </div>
    </div>
  )
}

export default RangeSelect