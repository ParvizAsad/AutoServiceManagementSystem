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
function Header() {
  return (
    <div>
    <Navbar id='NavbarId'
    >
      <img src='./src/Assets/Images/Logo/logo.webp' alt='Logo'/>
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