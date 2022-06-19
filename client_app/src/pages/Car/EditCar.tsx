import './editCar.scss';
import Header from '../../components/header/Header';
import Carousel from '../../components/carousel/Carousel';
import { CarType } from '../../utils/models/Car';
import { useEffect, useState } from 'react';
import { getCarById, getReportsByCarId } from '../../utils/apis/CarsApi';
import { useParams } from 'react-router-dom';
import Button, { ButtonSize } from '../../components/common/button/Button';
import { IReport } from '../../utils/models/Report';
import ReportCard from '../../components/Cards/ReportCard/ReportCard';
import { createKeyValueArrayFromObject, flattenObject } from '../../utils/helpers/flattenObject';

interface IEditCarProps {

}

const EditCar = (props:IEditCarProps) => {
  
  const params = useParams();
  const [ car, setCar ] = useState<CarType>()
  const [reports, setReports] = useState<Array<IReport>>();

  useEffect(() => {
    getCarById(params.id|| '').then((res) => {
      setCar(res);
    });

    getReportsByCarId(params.id ?? car?.id ?? '').then((res) => {
      setReports(res!.data)
    })
  }, [])

  return(
    <div>
      <Header/>
      <div className='editCar'>
        <div className='editCar-header'>
          <div className='editCar-header-label'>Edit Car</div>
          <div className='editCar-header-double'>{ car?.id }</div>
        </div>
        <div className='editCar-header-info'>
          <div className='editCar-header-info-section'>
            <div className='editCar-header-info-section-subSection'>
              <div className='editCar-header-info-main'>{car?.CarBrand.name}</div>
              <div className='editCar-header-info-section-subSection-info'>{car?.CarModel.name}</div>
              <div className='editCar-header-info-section-subSection-info'>{ car?.CarGeneration.name }</div>
              <div className='editCar-header-info-section-subSection-info'>{ car?.year }</div>
            </div>
            <div className='editCar-header-info-section-subSection'>
              <div className='editCar-header-info-section-subSection-smallinfo'>{car?.registrationPlate}</div>
              <div className='editCar-header-info-section-subSection-smallinfo'>{car?.vin}</div>
              <Button size={ButtonSize.SMALL} outerFunction={undefined} type={true} name={'Buy'}></Button>
              <Button size={ButtonSize.SMALL} outerFunction={undefined} type={true} name={'Reject'}></Button>
              <Button size={ButtonSize.SMALL} outerFunction={undefined} type={true} name={'Edit'}></Button>
              <Button size={ButtonSize.SMALL} outerFunction={undefined} type={true} name={'Add Vin'}></Button>
              <Button size={ButtonSize.SMALL} outerFunction={undefined} type={true} name={'Add Number plates'}></Button>
            </div>
          </div>

          <div className='editCar-header-info-section'>
            <div className='editCar-header-info-main'>{car?.price} Zl</div>
          </div>

        </div>
        <div className='editCar-body'>
          <Carousel images={car?.images || []}/>
          <div className='editCar-header-info-main'>Reports</div>
          <div className='editCar-body-section'> 
            { reports?.map((report) => {
              return(
                <div key={report.id} className='editCar-body-section-halfwidth'>
                  <ReportCard editable={false} report={report} />
                </div>
              )
            }) }
          </div>
          <div className='edit-body-section'>
            <div>
              <div className='editCar-header-info-main'>Specs</div>
              <div>
                <div className='carCard-expanded-specs-wrapper editCar-body-section-wrapper'>
                  { createKeyValueArrayFromObject(flattenObject(car || {}), ['state', 'id', 'images', 'mainImage', 'description', 'market', 'name', 'registrationPlate', 'model_id', 'vin']).map((item:any, index: number) => {
                    return(
                      <div key={index} className='carCard-expanded-specs-wrapper-item'>
                        <div className='carCard-expanded-specs-wrapper-item-key'>{ item[0] } </div> : { item[1] } 
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>

          <div className='edit-body-section'>
            <div className='editCar-header-info-main'>Features</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCar;