import React, { useCallback, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { accountService } from "../../../Api/services/Account";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login() {
  const [state, setState] = useState(false);

  const Credentials = {
    userName: " ",
    password: " ",
    rememberMe: state,
  };

  const [credentials, setCredentials] = useState(Credentials);

  const Login = useCallback(
    (e) => {
      e.preventDefault();
      accountService.login(credentials);
    },
    [credentials]
  );

  function rememberMe() {
    setState(!state);
  }
  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Login</h1>
      </div>
      <div id="FormForLogin">
        <Form inline id="Form" onSubmit={Login}>
          <FormGroup>
            <Label for="exampleUsername" hidden>
              Username
            </Label>
            <Input
              id="userName"
              name="userName"
              placeholder="Username"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="password" hidden>
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
          <FormGroup>
            <Label className="remeberMeLabel" for="rememberMe">
              Remember Me
            </Label>
            <Input
              addon
              aria-label="Checkbox for following text input"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              onChange={rememberMe}
            />
            <Link className="forForgetPassword">Forget Password?</Link>
          </FormGroup>
          <br />
          <Button className="forButton" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
