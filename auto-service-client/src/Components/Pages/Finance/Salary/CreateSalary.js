import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { salaryService } from "../../../../Api/services/Salaries";
import { employeeService } from "../../../../Api/services/Employee";
import { taxService } from "../../../../Api/services/Taxes";

const newSalary = {
  date: " ",
  bonus: " ",
  overTime: " ",
  netSalary: " ",
  taxId: " ",
  employeeId: " ",
};

function CreateSalary() {
  const [Salary, setSalary] = useState(newSalary);
  const [employee, setEmployee] = React.useState([]);
  const [taxes, setTaxes] = React.useState([]);
  const [error, setError] = useState([]);

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
      salaryService
        .postSalary(Salary)
        .then(() => {
          history.push("/salary");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
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

  React.useEffect(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxes(data);
    });
  }, []);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Salary</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={createSalary}>
          <FormGroup>
            <Label className="forLabel" for="employeeId">
              Select Employee
            </Label>
            <select
              className="employeeId"
              onChange={getElementValues}
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
            <Label className="forLabel" for="date">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              placeholder="date"
              onChange={getElementValues}
              type="date"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="bonus">
              Bonus AZN
            </Label>
            <Input
              id="bonus"
              name="bonus"
              placeholder="bonus"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="overTime">
              Overtime (hours)
            </Label>
            <Input
              id="overTime"
              name="overTime"
              placeholder="overTime"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="taxId">
              Select Tax
            </Label>
            <select
              className="taxId"
              onChange={getElementValues}
              name="taxId"
              id="taxId"
            >
              <option value="0">--Select Tax--</option>
              {taxes?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className="forSubmit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
export default CreateSalary;
