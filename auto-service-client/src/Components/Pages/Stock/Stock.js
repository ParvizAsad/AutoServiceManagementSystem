import React from 'react'
import {
Table,
Button
} from "reactstrap";
import "./Stock.scss";
import { useHistory } from "react-router-dom";
import { productService } from '../../../Api/services/Products';
import Swal from "sweetalert2";
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
import { Link } from "react-router-dom";


function Stock() {

  return (
<>
<div className ='ForHeading'>
    <h1>Stock</h1>
</div>
    <CardGroup id='moduleCards'>
         <Link to="product">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Products
        </CardTitle>
        <div className="Icon">
        </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="brand">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Brands
                  </CardTitle>
                  <div className="Icon">
        </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="category">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Categories
                  </CardTitle>
                  <div className="Icon">
        </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
  </CardGroup>
</>

  )
}

export default Stock