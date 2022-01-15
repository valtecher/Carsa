import React, { useEffect, useState } from 'react'
import PageLabel from '../../../components/pageLabel/PageLabel';
import Header from '../../../components/header/Header';
import { getCarById } from '../../../services/car/carService';
import Paper from '../../../components/shared/Papper/Papper';
import './CreateReport.scss'
import { CarType } from '../../../interfaces/models/car';
import CustomSelect from '../../../components/shared/select/CustomSelect';
import { reportTypesMock } from '../../../utils/constants/reportMock'
import { IReport, IReportWithType } from '../../../interfaces/models/report'
import InputPie from '../../../components/dashboardInputScore/DashBoardInputScore';
import DashBoardScore from '../../../components/dashboardScore/DashBoardScore';
import { getReportOverview, getReportsForOverview, addReport, getAllReportsForCar } from '../../../services/reviewReport/reportReviewService';
import { ReportType } from '../../../interfaces/models/reportType';

const CreateReport = (props:any) => {
  
  const [ car, setCar ] = useState<CarType>();
  const [ selectedReportType, setSelectedReportType ] = useState<any>('');
  const [ reports, setReports ] = useState<Array<IReportWithType>>([]);
  const [ isFilled, setIsFilled ] = useState<boolean>(false);
  const [ currentReport, setCurrentReport ] = useState<IReport>({
    condition: 0, 
    details: '', 
  });

  const [ fetchedReports, setFetchedReport ] = useState();
  


  useEffect(() => {
    const idToRequest = props.match.params.id
    getCarById(idToRequest).then((res:any) => {
      setCar(res.data)
      return res.data
    }).then((car) => {
      getAllReportsForCar(car?.id|| '').then((res:any) => {
          setFetchedReport(res?.data);
          if(res?.data?.length !== 0){
            res.data.map((report:any) => {
              console.log(report.type)
            })
            setReports(reports.concat(res?.data))
          }
      })
    })
  }, [])

  console.log('fetched:', fetchedReports)

  useEffect(() => {
    let tmpFilled = true;
    Object.values(currentReport).forEach((value) => {
      if(value === '' || value === 0){
        tmpFilled = false
      }
    })
    if(selectedReportType === ''){
      tmpFilled = false;
    }

    setIsFilled(tmpFilled)
  }, [currentReport, selectedReportType])

  const handleFieldChange = (e:any) => {
    setCurrentReport({ ...currentReport, [ e.target.name ]: e.target.value })
  }

  const handleReportAdd = () => {
    if(selectedReportType !== '' && isFilled){
      const idToRequest = props.match.params.id
      setReports([...reports, { ...currentReport, type: selectedReportType.ReportType }])  
      getReportOverview(car?.id || '').then((res) => {
        const data:any = res.data;
        console.log(data);
          const reportOverviewId = data.id;
          getReportsForOverview(reportOverviewId).then((reportsResponse:any) =>{
            const reports:Array<any> = reportsResponse.data.reports 
            console.log(reports);
            let types:Array<any> = [];
            if(reports && reports?.length !==  0) {
                types = reports?.map((report) => {
                console.log(report)
              });
            }
            if (!types.includes(selectedReportType)) {
              console.log('Here');
              const reportBody:IReport = {
                condition: currentReport.condition,
                details: currentReport.details,
                overview_id: reportOverviewId,
                ReportType:  selectedReportType.ReportType 
              }
              addReport(reportBody).then((res) => {
                console.log('Final: ', res)
              })
            }
            
          })
      }) 

      setCurrentReport({
        condition: 0, 
        details: '', 
      })
      setSelectedReportType('')

    }
    
  }

  return(
    <div className='createReport'>
      <PageLabel title={'Report'}/>
      <Header/>
      <div className='createReport-body'>
        <Paper className='createReport-body-add' size='mwa'>
            <div className='createReport-body-add-header'>Add reports for: { car?.CarGeneration?.CarModel?.CarBrand?.name } { car?.CarGeneration?.CarModel?.name } { car?.CarGeneration?.name}  { car?.color } { car?.link } </div>
            <div className='createReport-body-add-form'>
              <CustomSelect className='createReport-body-add-form-select' title='ReportType' options={reportTypesMock} setFilterOptions={setSelectedReportType} filterOptions={selectedReportType}  ></CustomSelect>
              <div className='createReport-body-add-form-fields'>
                <Paper size='xs' className='createReport-body-add-form-fields-item'>
                  Condition Score %
                  <InputPie name='condition' value={currentReport} changeValue={setCurrentReport} percentage={0} colour='lightblue' label=''/>
                </Paper>
                <Paper size='ss' className='createReport-body-add-form-fields-item'>
                  <textarea value={currentReport.details} onChange={handleFieldChange} name='details' placeholder='Add details'></textarea>
                </Paper>
              </div>
            </div>
            <div  className={`createReport-body-add-form-submit ${ isFilled? '' : 'disabled' }`} onClick={handleReportAdd}>Add Report</div>
        </Paper>
        <Paper className='createReport-body-reports' size='xla'>
          <div className='createReport-body-header'>All reports for this car</div>
          { reports.map((report, index) => {
            return(
              <div key={ index }>
                <Paper size='sw' className='createReport-body-report'>
                  <div className='createReport-body-report-header'>{ report.type || report.ReportType?.type }</div>
                  <div className='createReport-body-report-wrapper'>
                    <div className='createReport-body-report-wrapper-details'>{ report.details }</div>
                    <div className='createReport-body-report-wrapper-condition'>
                      <div className='createReport-body-report-wrapper-condition-separator'></div>
                      <DashBoardScore label='' percentage={report.condition} colour='lightblue'/>
                    </div>
                  </div>
                </Paper>
              </div>
            )
            
          }) }
        </Paper>
      </div>
    </div>
  )
}

export default CreateReport;