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
      <img src='dd'></img>
  <h1>             Car-Tool-Network Auto Service
</h1>
    </Navbar>
  </div>
  )
}

export default Header