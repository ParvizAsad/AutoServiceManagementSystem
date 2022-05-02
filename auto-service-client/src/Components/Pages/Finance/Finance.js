import React from 'react'
import { useHistory, Link } from "react-router-dom";
import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavbarText
} from "reactstrap";
import { GiMoneyStack } from 'react-icons/gi';
import { RiAdvertisementLine } from 'react-icons/ri';



function Finance() {
  return (
<>
<div className ='ForHeading'>
    <h1>Finance</h1>
</div>
    <CardGroup id='moduleCards'>
         <Link to="accounting">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Acounting
        </CardTitle>
        <div className="Icon">
        <GiMoneyStack/>
        </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="marketing">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Marketing
                  </CardTitle>
                  <div className="Icon">
        <RiAdvertisementLine/>
        </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="tax">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Taxes
                  </CardTitle>
                  <div className="Icon">
        <RiAdvertisementLine/>
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

export default Finance