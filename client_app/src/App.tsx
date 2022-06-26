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
import ClientDashboard from './pages/ClientPage/Dashboard/ClientDashboarsd';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import TechnicianDashboard from './pages/Technitian/Dashboard/TeachnitianDashboard';
import CreateReport from './pages/Technitian/Reports/CreateReport/CreateReport';
import EditCar from './pages/Car/EditCar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/offers' element={<OffersPage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        
        <Route path='/carselector/dashboard'  element={<CarSelectorDashboard/>}/>
        <Route path='/carselector/details/:id' element={<OrderWithConfigurationDetails/>}/>
        <Route path='/carselector/add/configuration/:id' element={<AddCarConfiguration/>}/>
        
        <Route path='/technician/dashboard' element={<TechnicianDashboard/>}/>
        <Route path='/technician/report/add/:id' element={<CreateReport/>}/>
        
        <Route path='/car/edit/:id' element={<EditCar/>} />

        <Route path='/client/dashboard' element={<ClientDashboard/>} />

        <Route element={<ProtectedRoute/>}>
          {/* <Route path='/client/dashboard' element={<ClientDashboard/>}/> */}
        </Route>
        
        <Route path="*" element={<Navigate to="/home"/>} />
      </Routes>
    </Router>
  );
}

export default App;
