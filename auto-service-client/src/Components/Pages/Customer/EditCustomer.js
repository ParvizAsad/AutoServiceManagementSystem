import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import { customerService } from "../../../Api/services/Customers";

const initialCustomer = {
  fullName: "",
  phoneNumber: "",
  email: "",
  debt: "",
};

function EditCustomer(props) {
  const [data, setData] = useState(initialCustomer);
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
    });
  }, []);

  const updateCustomer = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      customerService.putCustomer(id, data).then(() => {
        history.push("/customer");
      });
    },
    [data, history]
  );

  function handle(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {data.fullName} customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={updateCustomer}>
          <FormGroup>
            <Label className="forLabel" for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={(e) => handle(e)}
              value={data.fullName}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={(e) => handle(e)}
              value={data.phoneNumber}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="email"
              onChange={(e) => handle(e)}
              value={data.email}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="debt">Debt AZN</Label>
            <Input
              id="debt"
              name="debt"
              placeholder="debt"
              onChange={(e) => handle(e)}
              value={data.debt}
            />
          </FormGroup>

          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditCustomer;
