import React from 'react'
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import { FaPeopleArrows } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { GiAutoRepair } from 'react-icons/gi';



import { Link } from "react-router-dom";
// import { Pie, defaults } from 'react-chartjs-2'
// import { Chart, registerables } from 'chart.js'; 



function Director() {
  return (
<>
<div className ='ForHeading'>
    <h1>Sections for Director's Access</h1>
</div>
<CardGroup id='moduleCards'>
         <Link to="statistics">
         <Card className='moduleCard'>
      <CardBody className='moduleCardBody'>
        <CardTitle tag="h5" className='moduleCardTitle'>
          Statistics
        </CardTitle>
        <div className="Icon">
            <AiOutlineLineChart/>
            </div>
        <Button>
          Enter
        </Button>
      </CardBody>
    </Card>
         </Link>
          <Link to="employee">
          <Card className='moduleCard'>
                <CardBody className='moduleCardBody'>
                  <CardTitle tag="h5"  className='moduleCardTitle'>
                    Employees
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
  )
}

export default Director