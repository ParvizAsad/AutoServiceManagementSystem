import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
// import "./Employees/Salarys/UpdateEmployee.scss";

const newSalary= {
  Employee: " ",
  Date: " ",
  Bonus: " ",
  NetSalary: " ",
  Tax: " ", 
};

function EditSalary(props) {
  const [data, setNewData] = useState(newSalary);
  const [employee, setEmployee] = React.useState([]);

  const [SalaryData, setSalaryData] = useState();
  const history = useHistory();

  const getAllSalary = useCallback(() => {
    salaryService.getAllSalaryes().then(({ data }) => {
      setSalaryData(data);
    });
  }, [setSalaryData]);


  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setNewData(newdata);
  }

  const updateSalary = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      salaryService.putSalary(id, data).then(() => {
        history.push("/");
      });
    },
    // [employee, history, getAllEmployee]
  );

  return (
    <>
      <div className="ForHeading">
        <h1>Update the Salary</h1>
      </div>
      <div className="UpdatePage">
        <Form onSubmit={updateSalary}>
        <FormGroup>
            <Label for="customerId">Select Customer</Label>
            <select className="customerId" onChange={(e) => handle(e)} name="customerId" id="customerId">
              <option value="0">--Select Category--</option>
              {employee?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
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