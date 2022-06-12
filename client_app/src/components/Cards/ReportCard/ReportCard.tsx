import React from 'react';
import { IReport } from '../../../utils/models/Report';
import './reportCard.scss'

interface IReportCard {
  report: IReport,
}

const ReportCard = (props:IReportCard) => {
  const { report } = props;
  return (
    <div className='reportCard'>
        
    </div>
  )
}
export default ReportCard;