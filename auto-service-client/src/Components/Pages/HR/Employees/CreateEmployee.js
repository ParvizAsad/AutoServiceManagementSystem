import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import "./CreateEmployee.scss";
import { employeeService } from "../../../../Api/services/Employee";
import { positionService } from "../../../../Api/services/Positions";

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

function CreateEmployee() {
  const [employee, setEmployee] = useState(employees);
  const [position, setPosition] = React.useState([]);
  const [positionData, setPositionData] = useState();

  const [employeeData, setEmployeeData] = useState();
  const history = useHistory();

  const getAllEmployee = useCallback(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployeeData(data);
    });
  }, [setEmployeeData]);

  const createEmployee = useCallback(
    (e) => {
      e.preventDefault();
      employeeService.postEmployee(employee).then(() => {
        getAllEmployee();
        history.push("/employee");
      });
    },
    [employee, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    console.log(employee);
  };

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

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Employee</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createEmployee}>
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthDate">BirthDate</Label>
            <Input
              id="birthDate"
              name="birthDate"
              placeholder="birthDate"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="baseSalary">Base Salary</Label>
            <Input
              id="baseSalary"
              name="baseSalary"
              placeholder="Base Salary"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="positionId">Select Position</Label>
            <select className="positionId" onChange={getElementValues}  name="positionId" id="positionId">
              <option value="0">--Select Position--</option>
              {position?.map((item, idx) => (
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
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="location"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="educationLevel">Education Level</Label>
            <Input
              id="educationLevel"
              name="educationLevel"
              placeholder="Education"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="personalDetails">Personal Detail</Label>
            <Input
              onChange={getElementValues}
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

export default CreateEmployee;
