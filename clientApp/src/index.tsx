import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store, getStore, persistor } from './redux/store'
import { Auth0Provider } from '@auth0/auth0-react';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react'


axios.interceptors.request.use(
  (req) => {
    const store = getStore()
    if(store.auth?.user?.token){
      req.headers!['authorization'] = 'bearer ' + store.auth?.user?.token;
    }
    return req;
  }
)

axios.interceptors.response.use(
  (res) => {
    const store = getStore()
    if(store.auth?.user?.token){
      res.headers!['authorization'] = 'bearer ' + store.auth?.user?.token;
    }
    return res;
  }
)



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Auth0Provider domain={'dev-vme1aw3i.us.auth0.com'} clientId={'SeM0BVhfTkcUNTDZFbW8m15d1hWpRQ13'} redirectUrl={window.location.origin} audience={'bitokTeam'} scope={'openid profile email'}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
