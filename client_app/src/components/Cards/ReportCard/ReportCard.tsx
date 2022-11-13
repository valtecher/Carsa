import React, { useState } from 'react';
import { updateReport } from '../../../utils/apis/ReportApi';
import { IReport } from '../../../utils/models/Report';
import Pie from '../../CarStateScore/CarStateScore';
import Button, { ButtonSize } from '../../common/button/Button';
import TextInput from '../../common/input/TextInput';
import './reportCard.scss'

interface IReportCardProps {
  report: IReport,
  editable?: boolean,
  size?: ReportCardSize, 
  onDelete?: (report:IReport) => void
}

export enum ReportCardSize {
  HW = 'HALFWIDTH',
  FW = 'FULLWIDTH'
}

const ReportCard = (props:IReportCardProps) => {
  const { report, editable } = props;

  const [mode, setMode] = useState<boolean>(true)
  const [ pendingReport, setPendingReport ] = useState<IReport>(report);

  const handleChange = (e:any) => {
      setPendingReport({ ...pendingReport, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    updateReport(pendingReport)
  }

  return (
    <div className='reportCard'>
        <div className='reportCard-header'>
          <div className='reportCard-header-type'>{ report.type ?? report?.ReportType?.name}</div>
          <div className='reportCard-header-actions'>
           { editable?   <Button size={ButtonSize.SMALL} onClick={() => { 
              setMode(!mode) 
              if(!mode){
                handleSave();
              }
            }} type={false} name={mode ? 'Edit' : 'Save'} ></Button> : '' }
            { ! mode ? <Button size={ButtonSize.SMALL} onClick={() => {
              props?.onDelete?.(pendingReport)
              setMode(!mode)
            }} type={false} name={'Delete'} ></Button> : ''}
             { ! mode ? <Button size={ButtonSize.SMALL} onClick={() => {
              
              setPendingReport(report)
              setMode(!mode)
            }} type={false} name={'Cancel'} ></Button> : ''}
          </div>
        </div>
        <div className='reportCard-body'>
          <div className='reportCard-body-section'>
            { mode ?  <p>{ pendingReport.details }</p> : <textarea name='details' onChange={handleChange} value={pendingReport.details}></textarea>} 
          </div>
          <div className='reportCard-body-divider'></div>
          <div className='reportCard-body-section'>
           { mode ? <Pie percentage={pendingReport.condition} color={'white'} label={''} /> : <TextInput name='condition' onChange={handleChange} className='reportCard-input' placeholder='Condition' value={pendingReport.condition} ></TextInput>} 
          </div>
        </div>
    </div>
  )
}
export default ReportCard;