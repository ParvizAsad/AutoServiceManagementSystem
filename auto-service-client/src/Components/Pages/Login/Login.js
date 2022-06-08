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
import { accountService } from "../../../Api/services/Account";
import "./Login.scss";
import { Link } from "react-router-dom";
import { userService } from "../../../Api/services/Users";
import { useHistory } from "react-router-dom";

function Login() {
  const [state, setState] = useState(false);
  
  const Credentials = {
    username: " ",
    passWord: " ",
    rememberMe: state,
  };
  
  const [credentials, setCredentials] = useState(Credentials);
  const history = useHistory();

  const Login = useCallback(
    (e) => {
      e.preventDefault();
      userService.loginUser(credentials).then((response) => {
      //  history.push("/User");
        localStorage.setItem("userToken", JSON.stringify(response.data.authToken.result));
        localStorage.setItem("userId", JSON.stringify(response.data.userId));
        console.log(localStorage.userToken);
        console.log(localStorage.userId);
      });
    },
    [credentials, history]
  );

  function rememberMe(){
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
            <Label for="username" hidden>
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="passWord" hidden>
              Password
            </Label>
            <Input
              id="passWord"
              name="passWord"
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
                onChange={rememberMe}
              />
            </InputGroupText>
            <Input placeholder="Remember me" />
            <Link className="forForgetPassword">Forget Password?</Link>
          </InputGroup>
          <br />
          <Button className="forButton" type="submit">Login</Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
