import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
// import "./Employees/Salarys/CreateEmployee.scss";

const newSalary= {
  Date: "",
  Bonus: " ",
  NetSalary: " ",
  Tax: " ", 
  EmployeeId: " ",
};

function EditSalary(props) {
  const [Salary, setSalary] = useState(newSalary);
  const [employee, setEmployee] = React.useState([]);

  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    salaryService.getSalaryById(id).then((res) => {
      setSalary(res.data);
      })
  }, []);

  const editSalary = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      salaryService.putSalary(id, Salary).then(() => {
        history.push("/salary");
      });
    },
    [Salary, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    salaryService.getSalaryById(id).then((res) => {
      setSalary(res.data);
      })
  }, []);

  function handle(e) {
    // const newSalary = { ...Salary };
    // newSalary[e.target.id] = e.target.value;
    // setSalary(newSalary);
    const { name, value } = e.target;
    setSalary({ ...Salary, [name]: value });

  }

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {Salary.name} Salary</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editSalary}>
        <FormGroup>
            <Label for="EmployeeId">Select Employee</Label>
            <select className="EmployeeId" onChange={(e) => handle(e)}  name="EmployeeId" id="EmployeeId">
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
              onChange={(e) => handle(e)}
              value={Salary.Date}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Bonus">Bonus</Label>
            <Input
              id="Bonus"
              name="Bonus"
              placeholder="Bonus"
              onChange={(e) => handle(e)}
              value={Salary.bonus}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="NetSalary">NetSalary</Label>
            <Input
              id="NetSalary"
              name="NetSalary"
              placeholder="NetSalary"
              onChange={(e) => handle(e)}
              value={Salary.netSalary}
              type="number"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditSalary;