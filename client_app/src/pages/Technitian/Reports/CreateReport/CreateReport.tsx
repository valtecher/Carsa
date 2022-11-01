import React from 'react';
import './createReport.scss'
import Header from "../../../../components/header/Header";
import DropDown from '../../../../components/common/dropdown/DropDown';
import TextInput from '../../../../components/common/input/TextInput';
import Button from '../../../../components/common/button/Button';
import { useEffect } from 'react';
import { getReportsByCarId } from '../../../../utils/apis/CarsApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IReport, IReportType } from '../../../../utils/models/Report';
import ReportCard from '../../../../components/Cards/ReportCard/ReportCard';


const CreateReport = () => {

  const params = useParams();

  const [ reports, setReports ] = useState<Array<IReport>>([]);

  const [ pendingReport, setPendingReport ] = useState<IReport>({
    type: IReportType.None,
    condition: 0,
    details: '', 
    overview_id: ''
  }); 

  const addReport = () => {
    
  }

  const handleDropDownChange = (e:any) => {
    setPendingReport({ ...pendingReport, type: e.label })
  }

  const handleChange = (e:any) => {
    console.log(e.target.value, e.target.name);
    setPendingReport({...pendingReport, [e.target.name]: e.target.value})
  }


  return(
    <div>
      <Header/>
      <div className="createReport">
        <h1>Add report</h1>
        <div  className='createReport-wrapper'>
          <div className='createReport-wrapper-blotter'>
            <div className='createReport-wrapper-blotter-section'>
                <DropDown placeholder='Report type' setOuterOptions={handleDropDownChange} outerOption={{ key: 0, label: pendingReport.type}} options={Object.keys(IReportType).map((option, index:number) => {
                return { id: index, label: option }
               })}/>
              <TextInput name='condition' onChange={handleChange} className='createReport-wrapper-blotter-section-input' placeholder='Grade' value={pendingReport.condition} ></TextInput>
            </div>
            <div className='createReport-wrapper-blotter-section createReport-wrapper-blotter-label'>
              <h3>Details</h3>
            </div>
            <div className='createReport-wrapper-blotter-section'>
              <textarea name='details' onChange={handleChange} value={pendingReport.details}></textarea>
            </div>
            <div className='createReport-wrapper-blotter-section'>
              <Button onClick={addReport} type={false} name={'Add report'}></Button>
            </div>
          </div>
          <div className='createReport-wrapper-list'>
            { reports.map((report, index: number) => {
              return(
                <div key={report.id || index}>
                  <ReportCard report={report}/>
                </div>
              )
            }) }
          </div>
        </div>
      </div>
    </div>
  )
}


export default CreateReport;