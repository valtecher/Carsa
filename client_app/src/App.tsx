import React from 'react';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
