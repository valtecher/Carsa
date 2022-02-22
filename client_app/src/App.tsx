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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/offers' element={<OffersPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="*" element={<Navigate to="/home"/>} />
      </Routes>
    </Router>
  );
}

export default App;
