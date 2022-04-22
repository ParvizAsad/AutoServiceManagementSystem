import React from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
  } from "reactstrap";
  import "./Login.scss";
function Login() {
  return (
      <>
        <div className ='ForHeading'>
        <h1>Login</h1>
        </div>
      <div id='FormForLogin'>

        <Form inline id='Form'>
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
            type="password"
            />
        </FormGroup>
        {' '}
        <Button>
            Login
        </Button>
        </Form>
      </div>
      </>
  )
}

export default Login