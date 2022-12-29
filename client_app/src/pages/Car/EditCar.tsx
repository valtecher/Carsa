import './editCar.scss';
import Header from '../../components/header/Header';
import Carousel from '../../components/carousel/Carousel';
import { CarType } from '../../utils/models/Car';
import { useEffect, useState } from 'react';
import { buyCar, getCarById, getReportsByCarId, rejectCar, updateCar } from '../../utils/apis/CarsApi';
import { useParams } from 'react-router-dom';
import Button, { ButtonSize } from '../../components/common/button/Button';
import { IReport } from '../../utils/models/Report';
import ReportCard from '../../components/Cards/ReportCard/ReportCard';
import { createKeyValueArrayFromObject, flattenObject } from '../../utils/helpers/flattenObject';
import styled from 'styled-components';
import { findPath } from '../../utils/helpers/findPath';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

const StyledSpecs = styled.div`
  input {
    border-radius: 10px;
    border: 0px solid; 
    height: 16px; 
    margin: 5px;
  }
`

interface IEditCarProps {

}

export enum CarPageModes {
  VIEW =  'VIEW',
  EDIT = 'EDIT'
}

const bannedKeys = ['state', 'id', 'images', 'mainImage', 'description', 'market', 'name', 'registrationPlate', 'model_id', 'vin', 'ReportOverviews', 'Reports', 'updatedAt', 'createdAt', 'marketplace_link'];

const EditCar = (props:IEditCarProps) => {
  
  const params = useParams();
  const userRole = useSelector((state:AppState) => state.user.user.role )

  const [ car, setCar ] = useState<CarType>()
  const [reports, setReports] = useState<Array<IReport>>();
  const [ mode, setMode ] = useState<CarPageModes>(CarPageModes.VIEW);
  
  const [isAddingSpec, setIsAddingSpec] = useState<boolean>(false);
  const [ pendingVin, setPendingVin ] = useState<string>('');

  const isInEditMode = ():boolean => {
    return mode === CarPageModes.EDIT
  }

  useEffect(() => {
    getCarById(params.id|| '').then((res) => {
      setCar(res);
      setReports(res.ReportOverviews?.[0]?.Reports)
    });
  }, [])

  const handleSpecEdit = (e:any) => {
    const path = findPath(car, e.target.name);
    let updatedCar:any = {...car!}
    if(updatedCar[path]) {
      updatedCar[`${path}`][`${e.target.name}`] = e.target.value;
    } else {
      updatedCar = { ...updatedCar, [e.target.name]: e.target.value}
    }

    setCar(updatedCar)
    updateCar(updatedCar);
  }

  const handleCarSave = () => {
    setMode(CarPageModes.VIEW)
    if (car) {
          updateCar(car).then((res) => {
      })
    }
  }

  const handleBuy = () => {
    buyCar(car?.id || '');
  }

  const handleReject = () => {
    rejectCar(car?.id || '');
  }

  return(
    <div>
      <Header/>
      <div className='editCar'>
        <div className='editCar-header'>
          <div className='editCar-header-label'> { isInEditMode() ? 'Edit Car' : ''  } </div>
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
              <div className='editCar-header-info-section-subSection-smallinfo'>{car?.registrationNumber}</div>
              <div className='editCar-header-info-section-subSection-smallinfo'>{car?.vin}</div>
              
              { isInEditMode() ? '' : <Button size={ButtonSize.SMALL} onClick={handleBuy} type={true} name={'Buy'}></Button>}
              { isInEditMode() ? '' : <Button size={ButtonSize.SMALL} onClick={handleReject} type={true} name={'Reject'}></Button>}
              { userRole !== 'Client' && isInEditMode() ? <Button size={ButtonSize.SMALL} onClick={() => {setMode(CarPageModes.EDIT)}} type={true} name={'Edit'}></Button> : ''}
              { isAddingSpec && (<input name='vin' placeholder='vin' value={pendingVin} onChange={(e:any) => {
                setPendingVin(e.target.value);
              }}></input>) }
              { (isInEditMode() && !car?.vin) && <Button size={ButtonSize.SMALL} onClick={() => {
                setIsAddingSpec(!isAddingSpec);
                if(isAddingSpec && car) {
                  updateCar({...car, vin: pendingVin || ''}).then((res) => {
                    setCar(res);
                  })
                }
              }} type={true} name={isAddingSpec ? 'Save Vin' : 'Add Vin'}/>}
              { (isInEditMode() && !car?.registrationNumber) && <Button size={ButtonSize.SMALL} onClick={undefined} type={true} name={'Add Number plates'}/>}
              
            </div>
          </div>

          <div className='editCar-header-info-section'>
            <div className='editCar-header-info-main'>{car?.price} Zl</div>
          </div>

        </div>
        <div className='editCar-body'>
          <Carousel images={car?.images || []}/>
          <div className='editCar-header-info-main'>Reports
          </div>
          <div className='editCar-body-section'> 
            { reports?.map((report) => {
              return(
                <div key={report.id} className='editCar-body-section-halfwidth'>
                  <ReportCard editable={isInEditMode()} report={report} />
                </div>
              )
            }) }
          </div>
          <div className='edit-body-section'>
            <div>
              <div className='editCar-header-info-main'>Specs</div>
              <div>
                <div className='carCard-expanded-specs-wrapper editCar-body-section-wrapper'>
                  { createKeyValueArrayFromObject(flattenObject(car || {}), bannedKeys).map((item:any, index: number) => {
                    const [ key, value ] = item;
                    if( isInEditMode() ) {
                      return(
                        <StyledSpecs key={index}>
                         { key.replaceAll('_', ' ') }  : <input name={key} value={value} onChange={handleSpecEdit}></input>
                        </StyledSpecs>
                      )
                    } else {
                      return(
                        <div key={index} className='carCard-expanded-specs-wrapper-item editCar-inputPair'>
                          <div className='carCard-expanded-specs-wrapper-item-key'>{ item[0].replaceAll('_', ' ') } </div> : {item[1] } 
                        </div>
                        )  
                    }
                    
                  })}
                </div>
              </div>
            </div>

          </div>

            <div className='edit-body-section'>
            { !isInEditMode()? '' : <Button onClick={handleCarSave} type={true} name={'Save changes'} className='edit-body-section-center'></Button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCar;