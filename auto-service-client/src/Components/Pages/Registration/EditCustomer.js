import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
// import "./CreateCustomer.scss";
// import { positionService } from "../../../../Api/services/Positions";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import { customerService } from "../../../Api/services/Customers";

const initialCustomer = {
  FullName: " ",
  PhoneNumber: " ",
  Email: " ",
  Debt: " ",
};

function EditCustomer(props) {
  const [data, setData] = useState(initialCustomer);
  const history = useHistory();



  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
      })
  }, []);


  const updateCustomer = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      customerService.putCustomer(id, data).then(() => {
        // getAllCustomer();
        history.push("/registration");
      });
    },
    [data, history]
  );

  function handle(e) {
    // const newdata = { ...data };
    // newdata[e.target.id] = e.target.value;
    // setData(newdata);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {data.FullName} customer</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={updateCustomer}>
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={(e) => handle(e)}
              value={data.FullName}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={(e) => handle(e)}
              value={data.PhoneNumber}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              id="Email"
              name="Email"
              placeholder="Email"
              onChange={(e) => handle(e)}
              value={data.Email}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Debt">Debt</Label>
            <Input
              id="Debt"
              name="Debt"
              placeholder="Debt"
              onChange={(e) => handle(e)}
              value={data.Debt}
              type="number"
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditCustomer;
