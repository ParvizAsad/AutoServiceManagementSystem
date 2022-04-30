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
import Error from './Components/Pages/Errors/404/Error404';
import Director from './Components/Pages/Director/Director';
import Registration from './Components/Pages/Registration/Registration';
import HR from './Components/Pages/HR/HR';
import Finance from './Components/Pages/Finance/Finance';
import Service from './Components/Pages/Service/Service';
import Login from './Components/Pages/Login/Login';
import Accounting from './Components/Pages/Finance/Accounting/Accounting';
import Marketing from './Components/Pages/Finance/Marketing/Marketing';
import EmployeeDetail from './Components/Pages/HR/Employees/EmployeeDetail';
import ProductDetail from './Components/Pages/Stock/ProductDetail';
import CustomerDetail from './Components/Pages/Registration/CustomerDetail';
import CreateEmployee from './Components/Pages/HR/Employees/CreateEmployee';
import Position from './Components/Pages/HR/Positions/Positions';
import CreatePosition from './Components/Pages/HR/Positions/CreatePosition';
import CreateAccounting from './Components/Pages/Finance/Accounting/CreateAccounting';
import CreateDiscount from './Components/Pages/Finance/Marketing/CreateDiscount';
import CreateProduct from './Components/Pages/Stock/CreateProduct';
import CreateBrand from './Components/Pages/Stock/CreateBrand';
import CreateCategory from './Components/Pages/Stock/CreateCategory';
import EditEmployee from './Components/Pages/HR/Employees/EditEmployee'


function App() {
  return (
    <Router>
    <div>
    <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path={"/stock"} exact component={Stock} />
        <Route path={"/registration"} exact component={Registration} />
        <Route path={"/finance"} exact component={Finance} />
        <Route path={"/director"} exact component={Director} />
        <Route path={"/service"} exact component={Service} />
        <Route path="/HR" exact component={HR} />
        <Route path="/EditEmployee/{id}" exact component={EditEmployee} />
        <Route path="/EmployeeDetail/{id}" exact component={EmployeeDetail} />
        {/* <Route path={`${EditEmployee}/:id`} exact component={EditEmployee} /> */}
        <Route path="/EditEmployee/:id" exact component={EditEmployee} />
        <Route path="/EditEmployee" exact component={EditEmployee} />
        <Route path={"/login"} exact component={Login} />
        <Route path={"/accounting"} exact component={Accounting} />
        <Route path={"/marketing"} exact component={Marketing} />
        <Route path={"/employeedetail"} exact component={EmployeeDetail} />
        <Route path={"/createposition"} exact component={CreatePosition} />
        <Route path={"/createbrand"} exact component={CreateBrand} />
        <Route path={"/createcategory"} exact component={CreateCategory} />
        <Route path={"/createaccounting"} exact component={CreateAccounting} />
        <Route path={"/createemployee"} exact component={CreateEmployee} />
        <Route path={"/creatediscount"} exact component={CreateDiscount} />
        <Route path={"/createproduct"} exact component={CreateProduct} />
        <Route path={"/productdetail"} exact component={ProductDetail} />
        <Route path={"/customerdetail"} exact component={CustomerDetail} />
        <Route path={"/position"} exact component={Position} />
        <Route path={"/error"} exact component={Error} />
        <Redirect to={"/error"} exact />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
