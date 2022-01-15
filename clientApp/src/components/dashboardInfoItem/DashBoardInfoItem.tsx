import React, { useState } from 'react';
import './DashBoardInfoItem.scss'
import DashBoardScore from '../dashboardScore/DashBoardScore';
import {CarDashboardPresentationType as Car } from '../../interfaces/models/car'
import { handleColorSelect } from '../../utils/colorSelector'

interface IProps {
  car:Car;
}

const DashBoardInfoItem = ({ car }:IProps) => {
  const [isChecked, setIsChecked] = useState();
  const countOverAll = () => {
    return ( car?.report?.engine + car?.report?.interior + car?.report?.outside + car?.report?.suspension) / 4
  }

  return(
    <div className='dashboardInfoItem'>
        <div className='dashboardInfoItem-general'>
          <p className='dashboardInfoItem-general-name'>{ car?.brand } { car?.model } { car?.generation }</p>
          <p className='dashboardInfoItem-general-plate'>{ car?.vin?  car?.vin : 'no vin' }</p>
        </div>
        {  }
        <div className='dashboardInfoItem-scores'>
          { car?.report?.interior !== -1? <DashBoardScore label={'Interior: '} percentage={car?.report?.interior} colour={handleColorSelect(car?.report?.interior)}/> : 'No interior report' }
          { car?.report?.outside !== -1? <DashBoardScore label={'Outside: '} percentage={car?.report?.outside} colour={handleColorSelect(car?.report?.outside)}/> : '  No outside report'} 
          { car?.report?.engine !== -1?  <DashBoardScore label={'Engine: '} percentage={car?.report?.engine} colour={handleColorSelect(car?.report?.engine)}/> : '  No engine report'} 
          { car?.report?.suspension !== -1? <DashBoardScore label={'Suspension: '} percentage={car?.report?.suspension} colour={handleColorSelect(car?.report?.suspension)}/> : '  No suspension report'}
        </div>
        
        <div className='dashboardInfoItem-overall'>
          <DashBoardScore label={''} percentage={countOverAll()} colour={'#E7BE81'}/>
        </div>
    </div>
  )
}

export default DashBoardInfoItem;
