import './createReport.scss'
import Header from "../../../../components/header/Header";
import DropDown from '../../../../components/common/dropdown/DropDown';
import TextInput from '../../../../components/common/input/TextInput';
import Button from '../../../../components/common/button/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IReport, IReportType } from '../../../../utils/models/Report';
import ReportCard from '../../../../components/Cards/ReportCard/ReportCard';
import { uuid } from '../../../../utils/helpers/uuid';
import { createReports, getExistingReportsForCar } from '../../../../utils/apis/ReportApi';
import { AppState } from '../../../../redux/store';
import { useSelector } from 'react-redux';


const CreateReport = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state:AppState) => state.user.user);

  const [ reports, setReports ] = useState<Array<IReport>>([]);
  const [serverReports, setServerReports] = useState<Array<IReport>>([])
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
    if(reports.length === 0){
      alert('You have not added reports')
    }

    console.log(reports);
    createReports({ carId: params.carId, technicianId: user.person_id, reports }).then((res) => {
      console.log(res);
    }).catch((e) => { alert(e) })
  }

  useEffect(() => {
    getExistingReportsForCar(params.carId || '').then((res) => {
      setServerReports([...res.data.reports])
    })
  }, [])


  return(
    <div>
      <Header/>
      <div className="createReport">
        <div className='createReport-header'>
          <h1>Add report</h1> 
          <Button onClick={() => {
            handleReportsSave();
          }} type={true} name={'Save'}></Button>
            <Button onClick={() => {
              navigate(`/${user?.role}/dashboard`);
          }} type={true} name={'Back'}></Button>
        </div>
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
            { [...reports, ...serverReports].map((report, index: number) => {
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