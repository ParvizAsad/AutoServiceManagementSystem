import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";
import { useParams } from "react-router-dom";
import axios, { Axios } from "axios";

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
};

function EditEmployee(props) {
    let { id } = useParams();
  const url = "https://localhost:44330/api/Employees/";
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState(employees);
  const [position, setPosition] = React.useState([]);
  const [positionData, setPositionData] = useState();
  const history = useHistory();

  React.useEffect(() => {
    positionService.getAllPositions().then(({ data }) => {
      console.log(data);
      setPosition(data);
    });
  }, []);

  const getAllPositions = useCallback(() => {
    positionService.getAllPositions().then(({ data }) => {
      setPositionData(data);
    });
  }, [setPositionData]);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(url + id)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
    //   .catch((er) => console.error(err));
  }, []);

  const updateEmployee = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      employeeService.putEmployee(id, data).then(() => {
        // getAllEmployee();
        history.push("/HR");
      });
    },
    [employee, history]
  );

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit a new Employee</h1>
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
              value={data.birthDate}
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

            {/* <SelectInput
        name="positionId"
        label="positionId"
        value={data.positionId || ""}
        defaultOption="Seçiniz"
        options={position?.map(item => ({
          value: item.id,
          text: item.name
        }))}
        onChange={(e) => handle(e)}
        // error={errors.categoryId}
      /> */}
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