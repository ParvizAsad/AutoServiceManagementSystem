import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { employeeService } from "../../../../Api/services/Employee";
import { cashBoxService } from "../../../../Api/services/CashBox";
// import "./Employees/Cashboxs/CreateEmployee.scss";

const newCashbox= {
  Date: "",
  Bonus: " ",
  NetCashbox: " ",
  Tax: " ", 
  EmployeeId: " ",
};

function EditCashbox(props) {
  const [Cashbox, setCashbox] = useState(newCashbox);
  const [employee, setEmployee] = React.useState([]);

  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    cashBoxService.getCashboxById(id).then((res) => {
      setCashbox(res.data);
      })
  }, []);

  const editCashbox = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      CashboxService.putCashbox(id, Cashbox).then(() => {
        history.push("/Cashbox");
      });
    },
    [Cashbox, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    cashboxService.getCashboxById(id).then((res) => {
      setCashbox(res.data);
      })
  }, []);

  function handle(e) {
    // const newCashbox = { ...Cashbox };
    // newCashbox[e.target.id] = e.target.value;
    // setCashbox(newCashbox);
    const { name, value } = e.target;
    setCashbox({ ...Cashbox, [name]: value });

  }

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {Cashbox.name} Cashbox</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editCashbox}>
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
              value={Cashbox.Date}
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
              value={Cashbox.bonus}
              type="number"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditCashbox;