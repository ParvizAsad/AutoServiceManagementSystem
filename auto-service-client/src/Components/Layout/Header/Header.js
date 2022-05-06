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

function Header() {
  return (
    <div>
    <Navbar id='NavbarId'
    >
      <img src={logo} alt='Logo'/>
  <h1>Car-Tool-Network Auto Service</h1>
  <div>
    <h4>Your Profile</h4>
    <h4>@User.Identity.Name-Logout</h4>
    <h4>Login</h4>

    <div>
      <AiOutlineUserAdd/>
    </div>
  </div>
    </Navbar>
  </div>
  )
}

export default Header