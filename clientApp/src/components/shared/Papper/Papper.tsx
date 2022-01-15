import { height, width } from '@mui/system';
import React from 'react'; 
import './Papper.scss';
interface Props {

}

const Paper = (props:any) => {

  const switchSize = (size:string) => {
      switch (size){
        case 'xs': 
          return { height: 150, width: 150 }
        case 's':
          return { height: 150, width: 250 }
        case 'ss':
          return { height: 150, width: 550 }
        case 'sw': 
          return {height: 100, width: '90%'}
        case 'sws': 
          return {height: 70, width: '80%'}
        case 'm':
          return { height: 250, width: 450 }
        case 'mwa': 
          return{ height: '25vh', width: '80%' }
        case 'ml':
          return { height: 550, width: 450 }
        case 'mw':
            return { height: 250, width: 550 }
        case 'l': 
          return { height: 350, width: 550 }
        case 'll': 
          return { height: 500, width: 250 }
        case 'lw': 
          return { height: 300, width: '90%' }
        case 'xl':
          return { height: 650, width: 650 }
        case 'xla':
          return { height: '82vh', width: '80%' } 
        case 'card':
          return { height: 250, width: 450 }
        default: 
          return { height: 150, width: 150 }
      }
  }

  return(
    <div style={{...switchSize(props.size)}} className={`papperWrapper ${props?.className}`}>
        { props.children}
    </div>
  )
} 
export default Paper