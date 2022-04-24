import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";

function CustomerDetail() {

  return (
    <>
      <div className ='ForHeading'>
          <h1>Customer Detail</h1>
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
            Customer FullName:
          </CardTitle>
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
            Email: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            isNotificationAllowed: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Debt: 
          </CardSubtitle>
          <CardText>
          Additional: 
          </CardText>
        </CardBody>
      </Card>
      </div>
    </>

  )
}

export default CustomerDetail