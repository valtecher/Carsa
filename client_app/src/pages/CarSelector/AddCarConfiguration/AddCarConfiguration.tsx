import { useState } from 'react'
import CarCard from '../../../components/Cards/CarCard/CarCard';
import Button from '../../../components/common/button/Button';
import TextInput from '../../../components/common/input/TextInput';
import Header from '../../../components/header/Header';
import { fetchCarByLink } from '../../../utils/apis/CarScapperApi';
import { CarType } from '../../../utils/models/Car';
import './addCarConfiguration.scss';

const AddCarConfiguration = () => {

  const [ link, setLink ] = useState<string>('')
  const [ fetchedCar, setFetchedCar ] = useState<CarType>();

  const handleLinkChange = (e:any) => {
    setLink(e.target.value)
  }

  const handleFetchCarLink = async () => {
    fetchCarByLink(link).then(( res ) => {
      setFetchedCar(res);
    })
  }

  const handleSubmit = () => {
    console.log('submit new car for order');
  }

  return(
    <div className='carSelector-add'>
      <div className='carSelector-add-header'>
        <Header/>
      </div>
      <div className='carSelector-add-body'>
          <div className='carSelector-add-body-label'>Add Car</div>
          <div className='carSelector-add-body-wrapper'>
         
          { !fetchedCar && 
           <div className='carSelector-add-body-manual carSelector-add-body-paper'>
             <div className='carSelector-add-body-paper-label'>
                Add Manually 
              </div>
            </div>
          }
          
          { !fetchedCar && <div className='carSelector-add-body-link carSelector-add-body-paper'>
            <div className='carSelector-add-body-paper-label'>
                Add By Link 
            </div>
            <div className='carSelector-add-body-paper-body'>
              <TextInput value={link} placeholder={'Enter link'} onChange={handleLinkChange}></TextInput>
              <div className='carSelector-add-body-paper-body-submit'>
                <Button outerFunction={() => { handleFetchCarLink()}} name={'Fetch'} type={false}></Button>
              </div>
            </div>
          
          </div>}
          { fetchedCar && <CarCard defaultExpended={true} car={fetchedCar} /> }
          </div>
      </div>
      <div className='carSelector-add-submit'>
          <Button name={'Submit'} outerFunction={handleSubmit} type={true}/>
      </div>
    </div>
  )
}

export default AddCarConfiguration;