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
// import logo from '../../../Assets/Images/Logo/toyota_logo_icon_169445.png';

function Header() {
  return (
    <div>
    <Navbar id='NavbarId'
    >
      <img src={logo} alt='Logo'/>
  <h1>Car-Tool-Network Auto Service</h1>
  <div>
    <h4>
      Your Profile
    </h4>
  </div>
    </Navbar>
  </div>
  )
}

export default Header