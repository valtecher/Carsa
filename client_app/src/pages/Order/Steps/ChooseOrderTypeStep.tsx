import React, { useMemo } from 'react';
import './chooseOrderType.scss'
import Paper from '../../../components/Paper/Paper';
import Button from '../../../components/common/button/Button';
import { uuid } from '../../../utils/helpers/uuid';

export enum PackageType {
  Single = 'Single', 
  Configuration = 'Configuration',
}

interface IPackage {
  id: string;
  type: PackageType,
  title: string; 
  description: string; 
  price: number;
  action?: any;
}

interface IChooseOrderTypeStepProps {
  selectOption: any
}

const ChooseOrderTypeStep = (props:IChooseOrderTypeStepProps) => {
  const { selectOption } = props;
  const packages: Array<IPackage> = useMemo<Array<IPackage>>(() => {

    return [ { id: uuid(), title: 'Single Car', type: PackageType.Single, description: `This service is ideal for you if you have chosen one car that you want to be checked and quite sure that it is in a good condition. Our technician will find all cons of the car and create special report for you.`, 
    price: 200, action: () => {
      selectOption(PackageType.Single)
    } }, 
    { id: uuid(), title: 'Configuration', type: PackageType.Configuration, description: `This product was created for people who are not keen on the cars or do not have time to search for them.
    Our managers will find the cars for you and technicians will check them giving comprehensive reports for each car.`, price: 850, 
    action: () => {
      selectOption(PackageType.Configuration)
    }}
  ]
  }, [])


  return(
    <div className='chooseOrderTypeStep'>
      { packages.map((item:IPackage) => {
        return( 
          <Paper key={item.id }>
            <div className='main-info-text'>
              {item.title}
            </div>
            <div className='usual-info-text'>{ item.description }</div>
            <div className='chooseOrderTypeStep-button'>
              <Button onClick={item?.action} type={false} name={item.price + 'zl'} />
            </div>
          </Paper>
          )})}
    </div>
  )
}

export default ChooseOrderTypeStep;