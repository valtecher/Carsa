import React from 'react'
import { render } from '@testing-library/react'
import { getAllCarBrands } from '../services/car/carService'

describe('Some test', () => {
  
  it('should fetch data for all cars', async () => {
    const result:any = await getAllCarBrands();
    expect(result.data).not.toBeNull()
  })


})