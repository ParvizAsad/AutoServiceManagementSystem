import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import "./CreateCustomer.scss";
import { CustomerService } from "../../../../Api/services/Customer";
import { positionService } from "../../../../Api/services/Positions";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";

const initialCustomer = {
  FullName: " ",
  phoneNumber: " ",
  Email: " ",
  Debt: " ",
};

function EditCustomer(props) {
    let { id } = useParams();
  const url = "https://localhost:44330/api/Customers/";
  const [Customer, setCustomer] = useState([]);
  const [data, setData] = useState(Customers);
  const [position, setPosition] = React.useState([]);
  const [positionData, setPositionData] = useState();
  const history = useHistory();

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      console.log(data);
      setPosition(data);
    });
  }, []);

  const getAllPositions = useCallback(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositionData(data);
    });
  }, [setPositionData]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(url + id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
    //   .catch((er) => console.error(err));
  }, []);

  const updateCustomer = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      CustomerService.putCustomer(id, data).then(() => {
        // getAllCustomer();
        history.push("/HR");
      });
    },
    // [Customer, history, getAllCustomer]
  );

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

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

export default EditCustomer;
