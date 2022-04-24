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
import "./ProductDetail.scss";

function ProductDetail() {


  return (
    <>
      <div className ='ForHeading'>
          <h1>Product Detail</h1>
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
            Product Name:
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Category: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Brand: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Base Price: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Sale Proce: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Count: 
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            BaseSalary: 
          </CardSubtitle>
        </CardBody>
      </Card>
      </div>
    </>

  )
}

export default ProductDetail