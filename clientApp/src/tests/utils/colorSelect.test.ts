import React from 'react'
import { handleColorSelect } from '../../utils/colorSelector';


describe('Color selector test', () => {
  
  const colors = { great: '#C6E781', good: '#E7E381', medium: '#E7BE81', bad: '#E78181' }

  describe('should return correct color for the given percent', () => {
    it('should return great for 95%', () => {
      const color = handleColorSelect(95);
      expect(color).toEqual(colors.great);
    })
    it('should return good for 55%', () => {
      const color = handleColorSelect(55);
      expect(color).toEqual(colors.good);
    })
    it('should return great for 35%', () => {
      const color = handleColorSelect(25);
      expect(color).toEqual(colors.medium);
    })
    it('should return great for 5%', () => {
      const color = handleColorSelect(5);
      expect(color).toEqual(colors.bad);
    })
  })

})
