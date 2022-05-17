import React, { useCallback, useState } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from "reactstrap";
import { accountService } from '../../../Api/services/Account';
  import "./Login.scss";

  const Credentials= {
    userName: " ",
    password: " ",
  };
function Login() {

  const [credentials, setCredentials] = useState(Credentials);

  const Login = useCallback(
    (e) => {
      e.preventDefault();
      accountService.login(credentials)
    },
    [credentials]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
      <>
        <div className ='ForHeading'>
        <h1>Login</h1>
        </div>
      <div id='FormForLogin'>

        <Form inline id='Form' onSubmit={Login}>
        <FormGroup>
            <Label
            for="exampleUsername"
            hidden
            >
            Username
            </Label>
            <Input
            id="exampleUsername"
            name="Username"
            placeholder="Username"
            onChange={getElementValues}
            type="Username"
            />
        </FormGroup>
        {' '}
        <FormGroup>
            <Label
            for="examplePassword"
            hidden
            >
            Password
            </Label>
            <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            onChange={getElementValues}
            type="password"
            />
        </FormGroup>
        {' '}
        <Button type="submit">Login</Button>

        </Form>
      </div>
      </>
  )
}

export default Login