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
import CreateEmployee from './Components/Pages/HR/Employees/CreateEmployee';
import Position from './Components/Pages/HR/Positions/Positions';
import CreatePosition from './Components/Pages/HR/Positions/CreatePosition';
import CreateAccounting from './Components/Pages/Finance/Accounting/CreateAccounting';
import CreateDiscount from './Components/Pages/Finance/Marketing/CreateDiscount';
import EditEmployee from './Components/Pages/HR/Employees/EditEmployee';
import ExportEmployee from './Components/Pages/HR/Employees/ExportEmployee';
import NonWorkingType from './Components/Pages/HR/NonWorkingTypes/NonWorkingTypes';
import Employee from './Components/Pages/HR/Employees/Employees';
import CreateNonWorkingType from './Components/Pages/HR/NonWorkingTypes/CreateNonWorkingType';
import EditNonWorkingType from './Components/Pages/HR/NonWorkingTypes/EditNonWorkingType';
import AddServiceCustomer from './Components/Pages/Customer/AddServiceCustomer';
import Tax from './Components/Pages/Finance/Taxes/Tax';
import Brand from './Components/Pages/Stock/Brands/Brands';
import CreateProduct from './Components/Pages/Stock/Products/CreateProduct';
import Category from './Components/Pages/Stock/Categories/Categories';
import CreateCategory from './Components/Pages/Stock/Categories/CreateCategory';
import CreateBrand from './Components/Pages/Stock/Brands/CreateBrand';
import ProductDetail from './Components/Pages/Stock/Products/ProductDetail';
import Product from './Components/Pages/Stock/Products/Products';
import ExportProduct from './Components/Pages/Stock/Products/ExportProducts';
import Admin from './Components/Pages/Admin/Admin';
import Role from './Components/Pages/Admin/Roles';
import User from './Components/Pages/Admin/Users';
import CreateRole from './Components/Pages/Admin/CreateRole';
import CreateService from './Components/Pages/Service/CreateService';
import ExportService from './Components/Pages/Service/ExportService';
import NonWorkingDetail from './Components/Pages/HR/NonWorkingDetails/NonWorkingDetails';
import CreateNonWorkingDetail from './Components/Pages/HR/NonWorkingDetails/CreateNonWorkingDetail';
import EditNonWorkingDetail from './Components/Pages/HR/NonWorkingDetails/EditNonWorkingDetail';
import Salary from './Components/Pages/Finance/Salary/Salary';
import CreateSalary from './Components/Pages/Finance/Salary/CreateSalary';
import EditSalary from './Components/Pages/Finance/Salary/EditSalary';
import CreateTax from './Components/Pages/Finance/Taxes/CreateTax';
import EditTax from './Components/Pages/Finance/Taxes/EditTax';
import EditDiscount from './Components/Pages/Finance/Marketing/EditDiscount';
import EditAccounting from './Components/Pages/Finance/Accounting/EditAccounting';
import EditBrand from './Components/Pages/Stock/Brands/EditBrand';
import EditCategory from './Components/Pages/Stock/Categories/EditCategory';
import EditService from './Components/Pages/Service/EditService';
import CreateUser from './Components/Pages/Admin/CreateUser';
import EditRole from './Components/Pages/Admin/EditRole';
import EditPosition from './Components/Pages/HR/Positions/EditPosition';
import EditProduct from './Components/Pages/Stock/Products/EditProduct';
import CashBox from './Components/Pages/Finance/CashBoxes/CashBox';
import CreateCashBox from './Components/Pages/Finance/CashBoxes/CreateCashBox';
import RegularCustomer from './Components/Pages/Finance/CashBoxes/RegularCustomer';
import OtherCustomer from './Components/Pages/Finance/CashBoxes/OtherCustomer';
import EditCashbox from './Components/Pages/Finance/CashBoxes/EditCashBox';
import Statistics from './Components/Pages/Director/Statistics';
import ResetPassword from './Components/Pages/Login/ResetPassword';
import CreateCustomer from './Components/Pages/Customer/CreateCustomer';
import CustomerDetail from './Components/Pages/Customer/CustomerDetail';
import Customer from './Components/Pages/Customer/Customers';
import ExportCustomer from './Components/Pages/Customer/ExportCustomer';
import EditCustomer from './Components/Pages/Customer/EditCustomer';
import Profile from './Components/Pages/Profile/Profile';
import Convertor from './Components/Pages/Convertor/Convertor';
import AddProductCustomer from './Components/Pages/Customer/AddProductCustomer';
import AutoStatus from './Components/Pages/Service/AutoStatus';
import CustomerService from './Components/Pages/Customer/CustomerService'

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
        <Route path={"/brand"} exact component={Brand} />
        <Route path={"/category"} exact component={Category} />
        <Route path={"/tax"} exact component={Tax} />
        <Route path={"/product"} exact component={Product} />
        <Route path={"/admin"} exact component={Admin} />
        <Route path={"/role"} exact component={Role} />
        <Route path={"/user"} exact component={User} />
        <Route path={"/productdetail"} exact component={ProductDetail} />
        <Route path={"/customerdetail"} exact component={CustomerDetail} />
        <Route path={"/position"} exact component={Position} />
        <Route path={"/nonworkingtype"} exact component={NonWorkingType} />
        <Route path={"/nonworkingdetail"} exact component={NonWorkingDetail} />
        <Route path="/HR" exact component={HR} />
        <Route path="/employee" exact component={Employee} />
        <Route path="/customer" exact component={Customer} />
        <Route path="/salary" exact component={Salary} />
        <Route path="/cashbox" exact component={CashBox} />
        <Route path="/regularCustomer" exact component={RegularCustomer} />
        <Route path="/otherCustomer" exact component={OtherCustomer} />
        <Route path="/statistics" exact component={Statistics} />
        <Route path="/resetpassword" exact component={ResetPassword} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/convertor" exact component={Convertor} />
        <Route path="/autostatus" exact component={AutoStatus} />
        
        
        <Route path="/ExportEmployee" exact component={ExportEmployee} />
        <Route path="/ExportProduct" exact component={ExportProduct} />
        <Route path="/ExportCustomer" exact component={ExportCustomer} />
        <Route path="/ExportService" exact component={ExportService} />

        <Route path="/EmployeeDetail/:id" exact component={EmployeeDetail} />
        <Route path="/ProductDetail/:id" exact component={ProductDetail} />
        <Route path="/CustomerDetail/:id" exact component={CustomerDetail} />
        <Route path="/AddServiceCustomer/:id" exact component={AddServiceCustomer} />
        <Route path="/AddProductCustomer/:id" exact component={AddProductCustomer} />
        <Route path={"/CustomerService/:id"} exact component={CustomerService} />

        <Route path={"/login"} exact component={Login} />
        <Route path={"/accounting"} exact component={Accounting} />
        <Route path={"/marketing"} exact component={Marketing} />
        <Route path={"/createposition"} exact component={CreatePosition} />
        <Route path={"/createrole"} exact component={CreateRole} />
        <Route path={"/createcustomer"} exact component={CreateCustomer} />
        <Route path={"/createbrand"} exact component={CreateBrand} />
        <Route path={"/createcategory"} exact component={CreateCategory} />
        <Route path={"/createaccounting"} exact component={CreateAccounting} />
        <Route path={"/createemployee"} exact component={CreateEmployee} />
        <Route path={"/creatediscount"} exact component={CreateDiscount} />
        <Route path={"/createproduct"} exact component={CreateProduct} />
        <Route path={"/createservice"} exact component={CreateService} />
        <Route path={"/createnonworkingtype"} exact component={CreateNonWorkingType} />
        <Route path={"/createnonworkingdetail"} exact component={CreateNonWorkingDetail} />
        <Route path={"/createsalary"} exact component={CreateSalary} />
        <Route path={"/createtax"} exact component={CreateTax} />
        <Route path={"/createuser"} exact component={CreateUser} />
        <Route path={"/createcashbox"} exact component={CreateCashBox} />

        <Route path={"/EditNonWorkingType/:id"} exact component={EditNonWorkingType} />
        <Route path={"/EditNonWorkingDetail/:id"} exact component={EditNonWorkingDetail} />
        <Route path="/EditEmployee/:id" exact component={EditEmployee} />
        <Route path="/EditSalary/:id" exact component={EditSalary} />
        <Route path="/EditTax/:id" exact component={EditTax} />
        <Route path="/EditDiscount/:id" exact component={EditDiscount} />
        <Route path="/EditAccounting/:id" exact component={EditAccounting} />
        <Route path="/EditBrand/:id" exact component={EditBrand} />
        <Route path="/EditCategory/:id" exact component={EditCategory} />
        <Route path="/EditService/:id" exact component={EditService} />
        <Route path="/EditRole/:id" exact component={EditRole} />
        <Route path="/EditPosition/:id" exact component={EditPosition} />
        <Route path="/EditCustomer/:id" exact component={EditCustomer} />
        <Route path="/EditCashBox/:id" exact component={EditCashbox} />
        <Route path="/EditProduct/:id" exact component={EditProduct} />

        <Route path={"/error"} exact component={Error} />
        <Redirect to={"/error"} exact />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
