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
import { simpleValidateForm } from '../../../../utils/helpers/validateForm';
import { addReportToConfiguration } from '../../../../utils/apis/OrderApi';


const CreateReport = () => {

  const [ reports, setReports ] = useState<Array<IReport>>([]);
  const params = useParams();

  const [ pendingReport, setPendingReport ] = useState<IReport>({
    carId: params.id, 
    type: IReportType.None,
    description: '', 
    grade: -1,
  }); 

  const addReport = () => {
    console.log(reports.some((report) => {
      console.log(report.type, ' pending report type: ', pendingReport.type  , '  result: ', report.type === pendingReport.type)
      return report.type === pendingReport.type}));

    if(simpleValidateForm(pendingReport) && !(reports.some((report) => report.type === pendingReport.type))){
        addReportToConfiguration(pendingReport);
        setReports([...reports, pendingReport])
        setPendingReport({
          carId: params.id, 
          type: IReportType.None,
          description: '', 
          grade: -1,
        })
    } else {
      alert('Fill all the needed fields or such report type exists')
    }
  }

  const handleDropDownChange = (e:any) => {
    setPendingReport({ ...pendingReport, type: e.label })
  }

  const handleChange = (e:any) => {
    setPendingReport({...pendingReport, [e.target.name]: e.target.value})
  }


  useEffect(() => {
    getReportsByCarId(params.id|| '').then((res) => {
      if(res){
        setReports(res.data)
      }
    });
  }, [])

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
              <TextInput name='grade' onChange={handleChange} className='createReport-wrapper-blotter-section-input' placeholder='Grade' value={pendingReport.grade === -1? '' : pendingReport.grade} ></TextInput>
            </div>
            <div className='createReport-wrapper-blotter-section createReport-wrapper-blotter-label'>
              <h3>Details</h3>
            </div>
            <div className='createReport-wrapper-blotter-section'>
              <textarea name='description' onChange={handleChange} value={pendingReport.description}></textarea>
            </div>
            <div className='createReport-wrapper-blotter-section'>
              <Button outerFunction={addReport} type={false} name={'Add report'}></Button>
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