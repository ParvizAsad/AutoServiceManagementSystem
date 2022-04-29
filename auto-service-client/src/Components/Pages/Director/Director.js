import React from 'react'
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { FaPeopleArrows } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { GiDirectorChair } from 'react-icons/gi';
import { Link } from "react-router-dom";


function Director() {
  return (
<>
<div className ='ForHeading'>
    <h1>Sections for Director's Access</h1>
</div>
<CardGroup id='moduleCards'>
         <Link to="">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Statistics
        </CardTitle>
        <div className="Icon">
            <GiDirectorChair/>
            </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to={"employees"}>
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Employees
                  </CardTitle>
                  <div className="Icon">
                  <GrUserAdmin/>
                  </div>
                  <Button>
                    Enter
                  </Button>
                </CardBody>
              </Card>
          </Link>
          <Link to="services">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Services
                  </CardTitle>
                  <div className="Icon">
                  <FaPeopleArrows/>
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

export default Director