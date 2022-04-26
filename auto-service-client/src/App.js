import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Components/Pages/Home/Home';
import Header from './Components/Layout/Header/Header';
import Stock from './Components/Pages/Stock/Stock';
import Error from './Components/Pages/Error/Error';
import Director from './Components/Pages/Director/Director';
import Registration from './Components/Pages/Registration/Registration';
import HR from './Components/Pages/HR/HR';
import Finance from './Components/Pages/Finance/Finance';
import Service from './Components/Pages/Service/Service';
import Login from './Components/Pages/Login/Login';
import Accounting from './Components/Pages/Finance/Accounting/Accounting';
import Marketing from './Components/Pages/Finance/Marketing/Marketing';
import EmployeeDetail from './Components/Pages/HR/EmployeeDetail';
import ProductDetail from './Components/Pages/Stock/ProductDetail';
import CustomerDetail from './Components/Pages/Registration/CustomerDetail';
import CreateEmployee from './Components/Pages/HR/CreateEmployee';


function App() {
  return (
    <Router>
    <div>
    <Header/>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/stock"} exact component={Stock} />
        <Route path={"/registration"} exact component={Registration} />
        <Route path={"/finance"} exact component={Finance} />
        <Route path={"/director"} exact component={Director} />
        <Route path={"/service"} exact component={Service} />
        <Route path={"/hr"} exact component={HR} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/accounting"} exact component={Accounting} />
        <Route path={"/marketing"} exact component={Marketing} />
        <Route path={"/employeedetail"} exact component={EmployeeDetail} />
        <Route path={"/createemployee"} exact component={CreateEmployee} />
        <Route path={"/productdetail"} exact component={ProductDetail} />
        <Route path={"/customerdetail"} exact component={CustomerDetail} />
        <Route path={"/error"} exact component={Error} />
        <Redirect to={"/error"} exact />
      </Switch>
    </div>
  </Router>

   
  );
}

export default App;
