import React, { useReducer } from "react";
import { Table, Button } from "reactstrap";
import { INITIAL_ASYNC_VALUES } from "../../../Consts/const";
// import "./HR.scss";
import { useHistory } from "react-router-dom";
import { employeeService } from "../../../Api/services/Employee";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavbarText
} from "reactstrap";
import { MdOutlinePeople } from 'react-icons/md';
import { GiAutoRepair } from 'react-icons/gi';

function Registration(props) {
  return (
<>
<div className ='ForHeading'>
    <h1>Reception</h1>
</div>
    <CardGroup id='moduleCards'>
         <Link to="customer">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Customers
        </CardTitle>
        <div className="Icon">
        <MdOutlinePeople/>
        </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="service">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Services
                  </CardTitle>
                  <div className="Icon">
                  <GiAutoRepair/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
  </CardGroup>
</>
  );
}

export default Registration;
