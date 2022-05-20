import React, { useCallback, useState } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroupText,
    InputGroup,
  } from "reactstrap";
import { accountService } from '../../../Api/services/Account';
import "./Login.scss";
import { Link } from "react-router-dom";

  const Credentials= {
    userName: " ",
    password: " ",
    rememberMe: " ",
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
            id="userName"
            name="userName"
            placeholder="Username"
            onChange={getElementValues}
            type="text"
            />
        </FormGroup>
        {' '}
        <FormGroup>
            <Label
            for="password"
            hidden
            >
            Password
            </Label>
            <Input
            id="password"
            name="password"
            placeholder="Password"
            onChange={getElementValues}
            type="password"
            />
        </FormGroup>
        

        <InputGroup>
    <InputGroupText>
      <Input
        addon
        aria-label="Checkbox for following text input"
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        onChange={getElementValues}
      />
    </InputGroupText>
    <Input placeholder="Remember me" />
    <Link>Forget Password?</Link>
  </InputGroup>
  <br />
        <Button type="submit">Login</Button>

        </Form>
      </div>
      </>
  )
}

export default Login