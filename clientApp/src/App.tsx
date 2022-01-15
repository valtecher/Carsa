import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import OfferedCars from "./pages/OfferedCars/OfferedCars";
import CarPage from "./pages/CarPage/CarPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProtectedRoute from "./components/shared/protectedRoute/ProtectedRoute";
import Dashboard from "./pages/DashBoard/DashBoard";
import OrderDashBoard from "./pages/DashBoard/OrderDashBoard/OrderDashBoard";
import PaymentDashBoard from "./pages/DashBoard/PaymentsDashBoard/PaymentsDashBoard";
import CarDashBoard from "./pages/DashBoard/CarDashBoard/CarDashBoard";
import CreateOrder from "./pages/DashBoard/Order/CreateOrder/CreateOrder";
import CreateReport from "./pages/ReportPages/CreateReport/CreateReport";
import ReportMainPage from "./pages/ReportPages/ReportMainPage/ReportMainPage";
function App() {


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/offers" component={OfferedCars}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegistrationPage}/>
                    <Route exact path="/car/:id" component={CarPage}/>
                    <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
                    <ProtectedRoute exact path="/dashboard/orders" component={OrderDashBoard}/>
                    <ProtectedRoute exact path="/dashboard/cars" component={CarDashBoard}/>
                    <ProtectedRoute exact path="/dashboard/payments" component={PaymentDashBoard}/>
                    <ProtectedRoute exact path="/report" component={ReportMainPage}/>
                    <Route exact path='/report/:id' component={CreateReport}/>
                    <Route exact path='/dashboard/createorder' component={CreateOrder}/>
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
