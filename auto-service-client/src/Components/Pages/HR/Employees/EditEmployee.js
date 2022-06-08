import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import defaultImageSrc from "../../../../Assets/Images/HR/defaultImage.png";

const employees = {
  fullName: "",
  phoneNumber: "",
  orderNumber: "",
  birthDate: "",
  baseSalary: "",
  location: "",
  personalDetails: "",
  educationLevel: "",
  positionId: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

function EditEmployee(props) {
  const url = "https://localhost:44330/api/Employees/";
  const [data, setData] = useState(employees);
  const [position, setPosition] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPosition(data);
    });
  }, []);

  useEffect(() => {
    const id = props.match.params.id;
    axios.get(url + id).then((res) => {
      setData(res.data);
    });
    //   .catch((er) => console.error(err));
  }, []);

  const updateEmployee = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      employeeService
        .putEmployee(id, data)
        .then(() => {
          // getAllEmployee();
          history.push("/employee");
        })
        .catch((e) => {
          // if(e.response.status===400){
          //   setError(e.response.data.errors.Name[0])
          // }
          // else if(e.response.status===500){
          //   setError(e.response.data)
          // }
        });
    }
    // [employee, history, getAllEmployee]
  );

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setData({
          ...data,
          imageFile,
          imageName: x.target.result,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setData({
        ...data,
        imageFile: null,
        imageSrc: defaultImageSrc,
        imageName: defaultImageSrc,
      });
    }
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  return (
    <>
      <div className="ForHeading">
        <h1>Edit {data.fullName}</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={updateEmployee}>
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={(e) => handle(e)}
              value={data.fullName}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="imageName">Image</Label>
            <img src={data.imageName} className=" profilePicture" />
            <Input
              type="file"
              name="imageName"
              onChange={showPreview}
              accept="image/*"
              id="imageName"
              // onChange={showPreview}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={(e) => handle(e)}
              value={data.phoneNumber}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">BirthDate</Label>
            <Input
              id="birthDate"
              name="birthDate"
              placeholder="birthDate"
              onChange={(e) => handle(e)}
              value={moment(data.birthDate).format("yyyy-MM-DD")}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="baseSalary">Base Salary</Label>
            <Input
              id="baseSalary"
              name="baseSalary"
              placeholder="Base Salary"
              onChange={(e) => handle(e)}
              value={data.baseSalary}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="positionId">Select Position</Label>
            <select
              className="positionId"
              onChange={(e) => handle(e)}
              name="positionId"
              value={data.positionId}
              id="positionId"
            >
              {position?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="orderNumber">Order Number</Label>
            <Input
              id="orderNumber"
              name="orderNumber"
              placeholder="orderNumber"
              onChange={(e) => handle(e)}
              value={data.orderNumber}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="location"
              onChange={(e) => handle(e)}
              value={data.location}
              type="text"
            />
          </FormGroup>

          <FormGroup>
            <Label for="educationLevel">Education Level</Label>
            <Input
              id="educationLevel"
              name="educationLevel"
              placeholder="Education"
              onChange={(e) => handle(e)}
              value={data.educationLevel}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="personalDetails">Personal Detail</Label>
            <Input
              onChange={(e) => handle(e)}
              value={data.personalDetails}
              id="personalDetails"
              name="personalDetails"
              type="textarea"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditEmployee;
