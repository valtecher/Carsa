import { render, cleanUp, fireEvent } from '@testing-library/react'
import {React} from 'react';
import PageLabel from './PageLabel'

describe('test if page label takes props in the proper way', () => {
  it('check title', () => {
    const testTitle = 'Home'
    const {getByText, container} = render(<PageLabel title={testTitle}/>)
    const title = getByText(testTitle)
    expect(title).toBeInTheDocument();
  })

})