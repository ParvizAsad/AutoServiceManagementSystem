import React, {useState} from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    NavbarText,
    CardImg
  } from "reactstrap";
  import "./Header.scss";
import logo from '../../../Assets/Images/Logo/logo.webp';
import Icon from '../../../Assets/Images/Icon/profile-icon.jpg';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useHistory, Link } from "react-router-dom";
import { userService } from '../../../Api/services/Users';
import { accountService } from '../../../Api/services/Account';

function Header() {

  const [user, setUser] = useState();
  const history = useHistory();

  React.useEffect(() => {
    userService.getUserById().then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div>
    <Navbar id='NavbarId'
    >
      <img src={logo} alt='Logo'/>
  <h1>Car-Tool-Network Auto Service</h1>
  <div>
  <Link to="profile">Your Profile</Link>

      <AiOutlineUserAdd/>
    <div>
    <div>
      {/* user.IsAuthenticated==true */}
    {false?
    (<h4><Link onClick={accountService.logout()}>Logout</Link></h4>) 
    : (<h4><Link to="login">Login</Link></h4>)}
    </div>
    </div>
  </div>
    </Navbar>
  </div>
  )
}

export default Header