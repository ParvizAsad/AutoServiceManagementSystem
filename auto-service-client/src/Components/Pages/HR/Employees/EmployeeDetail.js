import React from 'react'
import {
  CardGroup,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
  Button
} from "reactstrap";
import "./EmployeeDetail.scss";

function EmployeeDetail() {

  return (
    <>
      <div className ='ForHeading'>
          <h1>Employee Detail</h1>
      </div>
      <div className='DetailPage'>
      <Card>
        <CardImg
          alt="Card image cap"
          src=""
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            Employee FullName:
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Position: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Phone Number: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Order Number: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Phone Number: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Location: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            BaseSalary: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Education Level: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Birthdate: 
          </CardSubtitle>


          <CardText>
          Non-working-detail: 
          </CardText>
        </CardBody>
      </Card>
      </div>
    </>

  )
}

export default EmployeeDetail