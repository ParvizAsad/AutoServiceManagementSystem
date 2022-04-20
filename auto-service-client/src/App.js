import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
    <>
    <Router>
    <div>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/stock">
          <Stock />
        </Route>
        <Route path="/error">
          <Error />
        </Route>
        <Route path="/director">
          <Director />
        </Route>
        <Route path="/registration">
          <Registration/>
        </Route>
        <Route path="/hr">
          <HR/>
        </Route>
        <Route path="/finance">
          <Finance/>
        </Route>
      </Switch>
    </div>
  </Router>
  <Header/>
  <Home/>
    </>
  );
}

export default App;
