import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { roleService } from "../../../Api/services/Roles";

const newRole = {
  Name: " ",
};

function CreateRole() {
  const [Role, setRole] = useState(newRole);

  const [RoleData, setRoleData] = useState();
  const history = useHistory();

  const getAllRole = useCallback(() => {
    roleService.getAllRoles().then(({ data }) => {
      setRoleData(data);
    });
  }, [setRoleData]);

  const createRole = useCallback(
    (e) => {
      e.preventDefault();
      roleService.postRole(Role).then(() => {
        getAllRole();
        history.push("/Role");
      });
    },
    [Role, history, getAllRole]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setRole({ ...Role, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Role</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createRole}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateRole;
