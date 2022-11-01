import React, { useState } from 'react';
import { IReport } from '../../../utils/models/Report';
import Pie from '../../CarStateScore/CarStateScore';
import Button, { ButtonSize } from '../../common/button/Button';
import TextInput from '../../common/input/TextInput';
import './reportCard.scss'

interface IReportCard {
  report: IReport,
  editable?: boolean,
  size?: ReportCardSize, 
}

export enum ReportCardSize {
  HW = 'HALFWIDTH',
  FW = 'FULLWIDTH'
}

const ReportCard = (props:IReportCard) => {
  const { report, editable } = props;

  const [mode, setMode] = useState<boolean>(true)
  const [ pendingReport, setPendingReport ] = useState<IReport>(report);

  const handleChange = (e:any) => {
      setPendingReport({ ...pendingReport, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    console.log(pendingReport);
    console.log('Saving report');

  }

  return (
    <div className='reportCard'>
        <div className='reportCard-header'>
          <div className='reportCard-header-type'>{ report.type }</div>
          <div className='reportCard-header-actions'>
           { editable?   <Button size={ButtonSize.SMALL} onClick={() => { 
              setMode(!mode) 
              if(!mode){
                handleSave();
              }
            }} type={false} name={mode ? 'Edit' : 'Save'} ></Button> : '' }
            { ! mode ? <Button size={ButtonSize.SMALL} onClick={() => {
              setPendingReport(report)
              setMode(!mode)
            }} type={false} name={'Cancel'} ></Button> : ''}
          </div>
        </div>
        <div className='reportCard-body'>
          <div className='reportCard-body-section'>
            { mode ?  <p>{ pendingReport.type }</p> :   <textarea name='description' onChange={handleChange} value={pendingReport.details}></textarea>} 
          </div>
          <div className='reportCard-body-divider'></div>
          <div className='reportCard-body-section'>
           { mode ? <Pie percentage={pendingReport.condition} color={'white'} label={''} /> : <TextInput name='grade' onChange={handleChange} className='reportCard-input' placeholder='Grade' value={pendingReport.condition} ></TextInput>} 
          </div>
        </div>
    </div>
  )
}
export default ReportCard;