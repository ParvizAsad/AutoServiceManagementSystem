import React from 'react'
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
  import "./Home.scss";

function Home() {
  return (
<>
<div id='HeadingForModules'>
    <h1>Auto Service System Modules</h1>
</div>
<CardGroup id='moduleCards'>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          Director
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          Admin
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          HR
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          Finance
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          Stock
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
    <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5">
          Reception
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          Card subtitle
        </CardSubtitle>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
  </CardGroup>
</>
  )
}

export default Home