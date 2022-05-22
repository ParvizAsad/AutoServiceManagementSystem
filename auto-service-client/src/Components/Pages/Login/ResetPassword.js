import React, { useCallback, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { accountService } from "../../../Api/services/Account";
import "./Login.scss";

const Credentials = {
  userName: " ",
  oldPassword: " ",
  newPassword: " ",
  confirmNewPassword: " ",
};
function ResetPassword() {
  const [credentials, setCredentials] = useState(Credentials);

  const Login = useCallback(
    (e) => {
      e.preventDefault();
      accountService.login(credentials);
    },
    [credentials]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Reset Password</h1>
      </div>
      <div id="FormForLogin">
        <Form inline id="Form" onSubmit={Login}>
          <FormGroup>
            <Label for="exampleUsername" hidden>
              Username
            </Label>
            <Input
              id="exampleUsername"
              name="Username"
              placeholder="Username"
              onChange={getElementValues}
              type="Username"
            />
          </FormGroup>{" "}
          <FormGroup>
            <Label for="oldPassword" hidden>
              oldPassword
            </Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              placeholder="Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword" hidden>
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmNewPassword" hidden>
              Confirm new Password
            </Label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>{" "}
          <Button type="submit">Change Password</Button>
        </Form>
      </div>
    </>
  );
}

export default ResetPassword;
