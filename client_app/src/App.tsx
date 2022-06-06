import React from 'react';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import About from './pages/About/About';
import OffersPage from './pages/Offers/Offers';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import CarSelectorDashboard from './pages/CarSelector/Dashboard/CarSelectorDashboard';
import OrderWithConfigurationDetails from './pages/CarSelector/OrderDetails/OrderWithConfigurationDetails';
import AddCarConfiguration from './pages/CarSelector/AddCarConfiguration/AddCarConfiguration';
import ClientDashboard from './pages/Client/Dashboard/ClientDashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/offers' element={<OffersPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        
        <Route path='/carselector/dashboard'  element={<CarSelectorDashboard/>}/>
        <Route path='/carselector/details/:id' element={<OrderWithConfigurationDetails/>}/>
        <Route path='/carselector/add/configuration' element={<AddCarConfiguration/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/client/dashboard' element={<ClientDashboard/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/home"/>} />
      </Routes>
    </Router>
  );
}

export default App;
