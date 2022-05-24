import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
import { taxService } from "../../../../Api/services/Taxes";
import CurrencyInput from "react-currency-input-field";

const newSalary = {
  date: " ",
  bonus: " ",
  netSalary: " ",
  taxId: " ",
  employeeId: " ",
};

function EditSalary(props) {
  const [Salary, setSalary] = useState(newSalary);
  const [employee, setEmployee] = React.useState([]);
  const [taxes, setTaxes] = React.useState([]);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    salaryService.getSalaryById(id).then((res) => {
      setSalary(res.data);
    });
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
    });
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

  React.useEffect(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxes(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {Salary.name} Salary</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={editSalary}>
          <FormGroup>
            <Label className="forLabel" for="employeeId">Select Employee</Label>
            <select
              className="employeeId"
              onChange={(e) => handle(e)}
              name="employeeId"
              id="employeeId"
            >
              <option value="0">--Select Employee--</option>
              {employee?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="Date">Date</Label>
            <Input
              id="Date"
              name="Date"
              placeholder="Date"
              onChange={(e) => handle(e)}
              value={Salary.date}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="bonus">Bonus AZN</Label>
            <Input
              id="bonus"
              name="bonus"
              placeholder="bonus"
              onChange={(e) => handle(e)}
              value={Salary.bonus}
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="TaxId">Select Tax</Label>
            <select
              className="TaxId"
              onChange={(e) => handle(e)}
              name="TaxId"
              id="TaxId"
            >
              <option value="0">--Select Tax--</option>
              {taxes?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditSalary;
