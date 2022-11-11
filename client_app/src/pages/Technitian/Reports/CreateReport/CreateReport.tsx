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
import { uuid } from '../../../../utils/helpers/uuid';
import { createReports } from '../../../../utils/apis/ReportApi';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';


const CreateReport = () => {
  const params = useParams();
  const user = useSelector((state:AppState) => state.user.user);

  const [ reports, setReports ] = useState<Array<IReport>>([]);
  const [ pendingReport, setPendingReport ] = useState<IReport>({
    type: IReportType.None,
    condition: 0,
    details: '', 
    overview_id: '',
    type_id: ''
  }); 

  const addReport = () => {
      if(!reports.map((report) =>  report.type).includes(pendingReport.type)) {
        pendingReport.id = uuid();
        if(pendingReport.overview_id === ''){
          pendingReport.overview_id = params.id || '';
        }
        setReports([...reports, pendingReport])
      } else {
        alert('You have already added report of this type! Edit existing one if you want to')
      }
      
  }

  const handleDropDownChange = (e:any) => {
    setPendingReport({ ...pendingReport, type: e.label })
  }

  const handleChange = (e:any) => {
    setPendingReport({...pendingReport, [e.target.name]: e.target.value})
  }

  const handleReportDelete = (deletedReport:IReport) => {
    setReports(reports.filter((report) => report.id !== deletedReport.id))
  }

  const handleReportsSave = () => {
    console.log(reports)
    if(reports.length === 0){
      alert('You have not added reports')
    }

    console.log(user);
    createReports({ carId: params.carId, technicianId: user.person_id, reports })
  }


  return(
    <div>
      <Header/>
      <div className="createReport">
        <h1>Add report</h1> 
        <Button onClick={() => {
          handleReportsSave();
        }} type={false} name={'Save'}></Button>
        <div  className='createReport-wrapper'>
          <div className='createReport-wrapper-blotter'>
            <div className='createReport-wrapper-blotter-section'>
                <DropDown placeholder='Report type' setOuterOptions={handleDropDownChange} outerOption={{ key: 0, label: pendingReport.type}} options={Object.keys(IReportType).map((option, index:number) => {
                return { id: index, label: option }
               })}/>
              <TextInput name='condition' onChange={handleChange} className='createReport-wrapper-blotter-section-input' placeholder='condition' value={pendingReport.condition} ></TextInput>
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
                  <ReportCard report={report} editable={true} onDelete={handleReportDelete}/>
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