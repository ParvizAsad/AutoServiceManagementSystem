import React, { useReducer } from "react";
// import "./Employee.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { employeeService } from "../../../Api/services/Employee";
import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import { userService } from "../../../Api/services/Users";

const newUser = {
  Username: " ",
  Fullname: " ",
  Password: " ",
  ConfirmPassword: " ",
};

function CreateUser(props) {

  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [User, setUser] = useState(newUser);

  const history = useHistory();

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

  const createUser = useCallback(
    (e) => {
      e.preventDefault();
      userService.postUser(User).then(() => {
        history.push("/User");
      });
    },
    [User, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
    console.log(User);
  };


  return (
    <>
      <div className="ForHeading">
        <h1>Create a new User</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createUser}>
          <FormGroup>
            <Label for="Username">Username</Label>
            <Input
              id="Username"
              name="Username"
              placeholder="Username"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Fullname">Fullname</Label>
            <Input
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              id="Password"
              name="Password"
              placeholder="Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="ConfirmPassword">Confirm Password</Label>
            <Input
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUser;
