import React from 'react'
import { render } from '@testing-library/react';
import HomePageHeader from '../../components/Home/Header/HomeHeader'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
describe('Home Page Header test', () => {
  const middlewares:any = [];
  const mockStore = configureMockStore(middlewares);
  
  let state = {
    auth: {
      isAuthenticated: false
    }
  };

  const HeaderWrapper = () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
  
    return (
      
      <Provider store={store}> // Set context
       <Router history={history}>
          <HomePageHeader /> // Now App has access to context
        </Router>
      </Provider>
    )
  }
  
  const store = mockStore(() => state);
  it('should show only allowed links to unauthorized user', () => {
    const { getByText, queryByText } = render(<HeaderWrapper/>)
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Offers')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Log in')).toBeInTheDocument();
    expect(queryByText('Dashboard')).not.toBeInTheDocument();
    expect(queryByText('Reports')).not.toBeInTheDocument();
  })

  it('should show only allowed links to authorized user', () => {
    state.auth.isAuthenticated = true
    const { getByText,queryByText } = render(<HeaderWrapper/>)
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Offers')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(queryByText('Log in')).not.toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Reports')).toBeInTheDocument();
    expect(getByText('Log Out')).toBeInTheDocument();
  })

})

