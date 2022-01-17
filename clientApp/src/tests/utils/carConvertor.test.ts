import React from 'react'
import { CarType } from '../../interfaces/models/car';
import { carToFlatCar } from '../../utils/carConventor';
import  engine  from '../../interfaces/models/engine'

describe('converting objects', () => {
  const engine:engine = {
    name: '1.4Tsi',
    volume: '1398',
    power: 125,
    fuel_type: 'Petrol'
  }

  const car:CarType = {
    mainImage: '',
    description: '',
    brand: '',
    model: '',
    generation: '',
    price: 0,
    type: '',
    market: '',
    mileage: 0,
    color: '',
    drive: '',
    year: '',
    gearBox: '',
    images: [],
    equipment: [],
    Engine: engine,

  }

  it('should convert into flat car', () => {
    const flatCar = carToFlatCar(car);
    expect(flatCar).toHaveProperty('EngineName');
    expect(flatCar).toHaveProperty('EngineVolume');
    expect(flatCar).toHaveProperty('EnginePetrol');
    expect(flatCar).toHaveProperty('EnginePower');
  })

  


})


