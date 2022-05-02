import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from "reactstrap";
import { customerService } from '../../../Api/services/Customers';
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const customer = {
  FullName: " ",
  phoneNumber: " ",
  email: " ",
  isNotificationAllowed: " ",
  baseSalary: " ",
  debt: " ",
  additional: " ",
};
function CustomerDetail(props) {

  const [data, setData] = useState(customer);
  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
      })
  }, []);

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
            Customer FullName: {data.FullName}
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