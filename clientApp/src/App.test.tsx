
import App from './App';
import renderer from 'react-test-renderer'
import reducer from './redux/reducers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

const AppWrapper = () => {
  const store = createStore(reducer);

  return (
    <Provider store={store}> // Set context
      <App /> // Now App has access to context
    </Provider>
  )
}

const HomeWrapper = () => {
  const store = createStore(reducer);
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  return (
    <Provider store={store}> // Set context
     <Router history={history}>
      <HomePage /> // Now App has access to context
      </Router>
    </Provider>
  )
}
const LogInWrapper = () => {
  const store = createStore(reducer);
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  return (
    <Provider store={store}> // Set context
     <Router history={history}>
      <LoginPage /> // Now App has access to context
      </Router>
    </Provider>
  )
}


describe('components should render correct', () => {

  test('app snapshot test', () => {
    const tree = renderer.create(<AppWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('home page test', () => {
    const tree = renderer.create(<HomeWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('login page test', () => {
    const tree = renderer.create(<LogInWrapper/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
})




