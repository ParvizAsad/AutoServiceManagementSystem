import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
// import "./Employees/Salarys/CreateEmployee.scss";

const newSalary= {
  Date: " ",
  Bonus: " ",
  NetSalary: " ",
  Tax: " ", 
  EmployeeId: " ",
};

function CreateSalary() {
  const [Salary, setSalary] = useState(newSalary);
  const [employee, setEmployee] = React.useState([]);

  const [SalaryData, setSalaryData] = useState();
  const history = useHistory();

  const getAllSalary = useCallback(() => {
    salaryService.getAllSalaryes().then(({ data }) => {
      setSalaryData(data);
    });
  }, [setSalaryData]);

  const createSalary = useCallback(
    (e) => {
      e.preventDefault();
      salaryService.postSalary(Salary).then(() => {
        getAllSalary();
        history.push("/Salary");
      });
    },
    [Salary, history, getAllSalary]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setSalary({ ...Salary, [name]: value });
  };

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);
  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Salary</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createSalary}>
        <FormGroup>
            <Label for="EmployeeId">Select Employee</Label>
            <select className="EmployeeId" onChange={getElementValues}  name="EmployeeId" id="EmployeeId">
              <option value="0">--Select Employee--</option>
              {employee?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="Date">Date</Label>
            <Input
              id="Date"
              name="Date"
              placeholder="Date"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Bonus">Bonus</Label>
            <Input
              id="Bonus"
              name="Bonus"
              placeholder="Bonus"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="NetSalary">NetSalary</Label>
            <Input
              id="NetSalary"
              name="NetSalary"
              placeholder="NetSalary"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default CreateSalary;