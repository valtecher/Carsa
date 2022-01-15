import React, { useEffect, useState } from 'react'
import './CarDashBoard.scss'
import SideMenu from '../../../components/sideMenu/SideMenu';
import DashBoardInfo from '../../../components/dashboardInfo/DashBoardInfo';
import { useDispatch, useSelector } from "react-redux";
import { getClientCar } from '../../../redux/actions/carActions';
import { storeState } from '../../../redux/store';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { CarType } from '../../../interfaces/models/car';
import DashBoardCarCard from '../../../components/dashboardCard/DashBoardCarCard/DashBoardCarCard';
import { setSelectedcar, deleteSelectedCar } from '../../../redux/actions/carActions';
import DashBoardInfoItem from '../../../components/dashboardInfoItem/DashBoardInfoItem';
import DashBoardScore from '../../../components/dashboardScore/DashBoardScore';
import { cartodasboardview } from '../../../utils/carConventor';
import { IReport } from '../../../interfaces/models/report';
import { handleColorSelect } from '../../../utils/colorSelector';
import Carousel from '../../../components/carousel/Carousel';
import CarSpecPresentation from '../../../components/carSpecsPresentation/CarSpecPresentation';
import { ReportType } from '../../../interfaces/models/reportType';

const CarDashBoard = () => {

    const dispatch = useDispatch()
    const cars = useSelector((state:storeState) => {return state.cars.cars})
    const selectedCar: CarType = useSelector((state: storeState) => { return state.cars.selectedCar })
    const [ carsToShow, setCarsToShow ] = useState<Array<CarType>>();
    useEffect(()=>{
      dispatch(getClientCar())
    }, [])

    useEffect(() => {
      const carsTmp:Array<CarType> = []

      cars.forEach((carsinOrder:Array<CarType>) => {
        carsinOrder.forEach((car:CarType) => {
          carsTmp.push(car)
        })
      })

      setCarsToShow(carsTmp);
    }, [cars])

  const handleCloseInfo = () => {
    dispatch(deleteSelectedCar());
  }

  const handleCardClick = (car:CarType) => {
    dispatch(setSelectedcar(car))
    createSlides()
  }
  const createSlides = () => {
    return selectedCar?.images?.map((image) => {
      console.log(image, ' this is image')
      return {image, label: selectedCar?.CarGeneration?.CarModel?.CarBrand?.name }
    })
  }

  
  return(
  <div className={'dashboard'}>
      <SideMenu/>
      <div className='dashboard-workSpace'>
        <div className='dashboard-itemWrapper'>
          { [...carsToShow || []].map((car: CarType)=>{
            return(
              <DashBoardCarCard car={car} handleClick={handleCardClick} ></DashBoardCarCard>
            )
          }) 
          }
        </div>
        <DashBoardInfo>
        <div className='dashBoardInfo-wrapper-header'>
          <div> {selectedCar? '#' : '' } {selectedCar?.id}</div>
            { selectedCar?.Car_Order?.status || '' }
            <div>
            { selectedCar? <ImportExportIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' } 
            { selectedCar? <EditIcon className='dashBoardInfo-wrapper-header-icon' fontSize='large'/> : '' }
              <CloseIcon onClick={handleCloseInfo} className='dashBoardInfo-wrapper-header-icon' fontSize='large' color={ selectedCar? 'error' : 'disabled' }/>
            </div>
          
       
        </div>
        <div className='dashBoardInfo-wrapper-body'>
          <div className='dashBoardInfo-wrapper-body-carName'>
          { selectedCar?.CarGeneration?.CarModel?.CarBrand?.name } { selectedCar?.CarGeneration?.CarModel?.name }  { selectedCar?.CarGeneration?.name }
          </div>
          <div className='dashBoardInfo-wrapper-body-part'>
              { selectedCar?  <Carousel images={selectedCar.images}></Carousel> : ''}
          </div>
          <div className='dashBoardInfo-wrapper-body-part'>
          { selectedCar?  <div className='dashBoardInfo-wrapper-body-part-header'>Specs: </div> : '' } 
            <div className='dashBoardInfo-wrapper-body-part-body'>
          { selectedCar? <CarSpecPresentation car={selectedCar} /> : '' }  
            </div>
          </div>
          { selectedCar?   <div className='dashBoardInfo-wrapper-body-part'>
            Raports:
            <div className='dashBoardInfo-wrapper-body-part-body'>
              <DashBoardInfoItem car={cartodasboardview(selectedCar)}></DashBoardInfoItem>
              <p className='dashBoardInfo-wrapper-body-part-body-header'>Detailed Raports</p>
              <div className='dashBoardInfo-wrapper-body-part-body-detailed'>
                { [...selectedCar?.ReportOverviews?.[0]?.Reports || []].map((report:IReport)=>{

                  return(
                    <div className='dashBoardInfo-wrapper-body-part-body-detailed-item'>
                      <div className='dashBoardInfo-wrapper-body-part-body-detailed-item-reportId'> <p> #{ report.id } </p> </div>
                      <div className='dashBoardInfo-wrapper-body-part-body-detailed-item-reportHeader'>  <p>{ (report.ReportType as ReportType).name }: </p> </div>
                      <div className='dashBoardInfo-wrapper-body-part-body-detailed-item-reportDetails'>  <p>{ report.details } </p> </div>
                      <div className='dashBoardInfo-wrapper-body-part-body-detailed-item-reportScore'>
                        <DashBoardScore percentage={report.condition} label='overall: ' colour={handleColorSelect(report.condition)}></DashBoardScore>
                      </div>

                    </div>
                  )
                }) }
              </div>
            </div>
          </div> : ''}
         
        </div>
        </DashBoardInfo>

      </div>

    </div>
  )
}

export default CarDashBoard;