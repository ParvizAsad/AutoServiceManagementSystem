import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userService } from "../../../Api/services/Users";

const newUser = {
  fullName: " ",
  userName: " ",
  email: " ",
};

function EditUser(props) {
  const [user, setUser] = useState(newUser);
  const [userData, setUserData] = useState();
  const [role, setRole] = React.useState([]);
  const [userRole, setUserRole] = React.useState();
  const [userRoleData, setUserRoleData] = useState();
  const history = useHistory();

  const getAllUsers = useCallback(() => {
    userService.getAllUsers().then(({ data }) => {
      setUserData(data);
    });
  }, [setUserData]);

  useEffect(() => {
    const id = props.match.params.id;
    userService.getUserById(id).then((res) => {
      setUser(res.data);
    });
  }, []);

  React.useEffect(() => {
    const id = props.match.params.id;
    userService.GetAllUserRole().then(({ data }) => {
      {
        data?.filter((val) => val.userId == id).map((x) => setUserRole(x));
      }
    });
  }, []);

  const EditUser = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      userService.putUser(id, user).then(() => {
        getAllUsers();
        history.push("/user");
      });

      // .catch(
      //   e=>{
      //       if(e.response.status===400){
      //         setError(e.response.data.errors.Name[2])
      //       }
      //       else if(e.response.status===500){
      //         setError(e.response.data)
      //       }
      // }
      // );
    },
    [user, history]);

  function handle(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleRole(e) {
    const { name, value } = e.target;
    setUserRole({ ...userRole, [name]: value });
  }

  React.useEffect(() => {
    userService.getAllRole().then(({ data }) => {
      setRole(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {user.fullName} Product</h1>
      </div>
      <div className="EditPage">
        <Form onSubmit={EditUser}>
          <FormGroup>
            <Label className="forLabel" for="fullName">
              Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={(e) => handle(e)}
              value={user.fullName}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Label className="forLabel" for="userName">
              userName
            </Label>
            <Input
              id="userName"
              name="userName"
              placeholder="userName"
              onChange={(e) => handle(e)}
              value={user.userName}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Label className="forLabel" for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="email"
              onChange={(e) => handle(e)}
              value={user.email}
              type="text"
            />
          </FormGroup>

          {/* <FormGroup>
            <Label className="forLabel" for="roleId">Select role</Label>
            <select
              className="form-control"
              onChange={(e) => handleRole(e)}
              name="roleId"
              value={userRole.roleId}
s              id="roleId"
            >
              {role?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup> */}

          <Button className="forSubmit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default EditUser;
