import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { roleService } from "../../../Api/services/Roles";

const newRole = {
  Name: " ",
};

function EditRole(props) {
  const [role, setRole] = useState(newRole);

  const history = useHistory();

  const editRole = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      roleService.putRole(id, role).then(() => {
        history.push("/role");
      });
    },
    [role, history]
  );

  function handle(e) {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  }
  const getElementValues = (e) => {
    const { name, value } = e.target;
    setRole({ ...role, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {role.Name} role</h1>
      </div>
      <div className="EditPage">
        <Form onSubmit={editRole}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={(e) => handle(e)}
              value={role.Name}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditRole;
