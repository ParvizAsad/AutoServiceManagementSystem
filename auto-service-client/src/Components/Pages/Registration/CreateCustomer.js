import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./Createcustomer.scss";
import { customerService } from "../../../Api/services/Customers";

const initialCustomer = {
  FullName: " ",
  PhoneNumber: " ",
  Email: " ",
  Debt: " ",
};

function Createcustomer() {
  const [customer, setCustomer] = useState(initialCustomer);

  const [customerData, setCustomerData] = useState();
  const history = useHistory();

  const getAllCustomer = useCallback(() => {
    customerService.getAllCustomer().then(({ data }) => {
      setCustomerData(data);
    });
  }, [setCustomerData]);

  const createCustomer = useCallback(
    (e) => {
      e.preventDefault();
      customerService.postCustomer(customer).then(() => {
        history.push("/registration");
      });
    },
    [customer, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
    console.log(customer);
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new customer</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createCustomer}>
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="Email"
              placeholder="Email"
              onChange={getElementValues}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Debt">Debt</Label>
            <Input
              id="Debt"
              name="Debt"
              placeholder="Debt"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default Createcustomer;
