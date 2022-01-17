import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import CreateOrder  from '../../pages/DashBoard/Order/CreateOrder/CreateOrder';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'
import {  handleRender } from '../../pages/DashBoard/Order/CreateOrder/CreateOrder'


describe('Stepper test', () => {
  test('should render right components', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const { getByText, queryByText, screen } = render(
      <Router history={history}>
        <CreateOrder/>
      </Router>,
    )
  
    expect(getByText('Package')).toBeInTheDocument()
    expect(getByText('Single')).toBeInTheDocument()
    expect(getByText('200 zl')).toBeInTheDocument()
    const button = queryByText('200 zl')
    fireEvent.click(button);
    const res  = handleRender(0)
    expect(res.type.toString().toString()).toContain('Package is simply dummy text of the printing and typesetting industry.')
    const res1 = handleRender(2)
    expect(res1.type.toString().toString()).toContain('Accept')
    const res2 = handleRender(3)
    expect(res2.type.toString().toString()).toContain('stripeContainer')
  })
});
