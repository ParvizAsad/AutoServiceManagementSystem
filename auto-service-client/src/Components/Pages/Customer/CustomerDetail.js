import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { customerService } from "../../../Api/services/Customers";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Customer Detail of {data.fullName}</h1>
      </div>
      <div className="DetailPage">
        <Card className="forCard">
          <CardBody>
            <CardTitle className="Title" tag="h5">
              Customer FullName: {data.fullName}
            </CardTitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Phone Number: {data.phoneNumber}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Email: {data.email}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              isNotificationAllowed: true
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Debt: {data.debt}
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default CustomerDetail;
