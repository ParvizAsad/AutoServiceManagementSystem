import React, { useReducer } from "react";
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
  userName: " ",
  fullName: " ",
  password: " ",
  confirmPassword: " ",
  imageName: " ",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

function CreateUser(props) {

  const [employee, setEmployee] = React.useState([]);
  const [employeeData, setEmployeeData] = useState();
  const [user, setUser] = useState(newUser);

  const history = useHistory();

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      console.log(data);
      setEmployee(data);
    });
  }, []);

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
    console.log(user);
  };

  const showPreview= e=>{
    if(e.target.files && e.target.files[0]){
      let imageFile= e.target.files[0];
      const reader= new FileReader();
      reader.onload = x => {
        setUser({
          ...user,
          imageFile,
          imageName: x.target.result,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    }
    else{
      setUser({
        ...user,
        imageFile: null,
        imageSrc: defaultImageSrc
      })
    }
  }
  return (
    <>
      <div className="ForHeading">
        <h1>Create a new User</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createUser}>
          <FormGroup>
            <Label for="Username">Username</Label>
            <Input
              id="Username"
              name="Username"
              placeholder="Username"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Fullname">Fullname</Label>
            <Input
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Password">Password</Label>
            <Input
              id="Password"
              name="Password"
              placeholder="Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="ConfirmPassword">Confirm Password</Label>
            <Input
              id="ConfirmPassword"
              name="ConfirmPassword"
              placeholder="Confirm Password"
              onChange={getElementValues}
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageName">Image</Label>
            <img src={user.imageSrc} className=" profilePicture"
            />
            <Input
              type="file"
              name="imageName"
              accept="image/*" 
              id="imageName"
              onChange={showPreview}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUser;
