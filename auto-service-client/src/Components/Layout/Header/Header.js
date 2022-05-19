import React from 'react'
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

function Header() {
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
    {/* <h4>{User.Identity.IsAuthenticated}?(
              Logout
            ) : ( Login )</h4> */}
    </div>
  </div>
    </Navbar>
  </div>
  )
}

export default Header