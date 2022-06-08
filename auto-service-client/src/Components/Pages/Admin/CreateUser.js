import React from "react";
// import "./Employee.scss";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { employeeService } from "../../../Api/services/Employee";
import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import { userService } from "../../../Api/services/Users";
import defaultImageSrc from "../../../Assets/Images/HR/defaultImage.png";

const newUser = {
  username: " ",
  fullName: " ",
  passWord: " ",
  confirmPassWord: " ",
  email:" ",
  // imageName: " ",
  // imageSrc: defaultImageSrc,
  // imageFile: null,
};

function CreateUser(props) {
  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [user, setUser] = useState(newUser);

  const history = useHistory();

  // const getAllEmployee = useCallback(() => {
  //   employeeService.getAllEmployee().then(({ data }) => {
  //     setEmployeeData(data);
  //   });
  // }, [setEmployeeData]);

  // React.useEffect(() => {
  //   employeeService.getAllEmployee().then(({ data }) => {
  //     setEmployee(data);
  //   });
  // }, []);

  const createUser = useCallback(
    (e) => {
      e.preventDefault();
      userService.postUser(user).then(() => {
        history.push("/User");
      });
    },
    [user, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setUser({
          ...user,
          imageFile,
          imageName: x.target.result,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setUser({
        ...user,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };
  return (
    <>
      <div className="ForHeading">
        <h1>Create a new User</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createUser}>
        <FormGroup>
            <Label for="fullName">Fullname</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="email"
              onChange={getElementValues}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="passWord">Password</Label>
            <Input
              id="passWord"
              name="passWord"
              placeholder="password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassWord">Confirm Password</Label>
            <Input
              id="confirmPassWord"
              name="confirmPassWord"
              placeholder="Confirm Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for="imageName">Image</Label>
            <img src={user.imageSrc} className=" profilePicture" />
            <Input
              type="file"
              name="imageName"
              accept="image/*"
              id="imageName"
              onChange={showPreview}
            />
          </FormGroup> */}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUser;
