import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Button, Input } from "reactstrap";
import { userService } from "../../../Api/services/Users";


const newRole = {
  userId: " ",
  roleId: " ",
};

function ChangeRole(props) {
    const [getAllRole, setGetAllRole] = React.useState();
    const [userRole, setUserRole] = React.useState(newRole);
    const history = useHistory();

    React.useEffect(() => {
      userService.getAllRole().then(({ data }) => {
          setGetAllRole(data);
      });
    }, []);

    React.useEffect(() => {
      const id = props.match.params.id;
      userService.GetAllUserRole().then(({ data }) => {
          {data
              ?.filter((val) => val.userId == id)
              .map((x) =>
              setUserRole(x)
              )}
      });
    }, []);


    const updateUserRole = useCallback(
      (e) => {
        e.preventDefault();
        const id = props.match.params.id;
         userService.putRole(id, userRole).then(() => {
          history.push("/user");
         });
      },
       [userRole, history]
    );


      function handle(e) {
        const { name, value } = e.target;
        setUserRole({ ...userRole, [name]: value });
      }

  return (
    <>
    <div className="ForHeading">
      {/* <h1>Add product to {data.fullName} customer</h1> */}
    </div>
    <div className="CreatePage">
      <Form className="sss" onSubmit={updateUserRole}>
        
      <FormGroup>
            <Label className="forLabel" for="roleId">Select role</Label>
            <select
              className="form-control"
              onChange={(e) => handle(e)}
              name="roleId"
              value={userRole.roleId}
s              id="roleId"
            >
              {getAllRole?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
        <Button className="forSubmit" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </>
  )
}

export default ChangeRole