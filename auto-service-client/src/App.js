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


function App() {
  return (
    <Router>
    <Header/>
    <div>
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/stock"} exact component={Stock} />
        <Route path={"/finance"} exact component={Finance} />
        <Route path={"/director"} exact component={Director} />
        <Route path={"/registration"} exact component={Registration} />
        <Route path={"/hr"} exact component={HR} />
        <Route path={"/error"} exact component={Error} />
        <Redirect to={"/error"} exact />
      </Switch>
    </div>
  </Router>

   
  );
}

export default App;
