import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { financeService } from "../../../../Api/services/Finances";
// import "./Employees/Accountings/CreateEmployee.scss";

const newAccounting = {
  CommunalCost: " ",
  AdditionalCost: " ",
  Date: " ",
};

function CreateAccounting() {
  const [Accounting, setAccounting] = useState(newAccounting);

  const [AccountingData, setAccountingData] = useState();
  const history = useHistory();

  const getAllAccounting = useCallback(() => {
    financeService.getAllFinances().then(({ data }) => {
      setAccountingData(data);
    });
  }, [setAccountingData]);

  const createAccounting = useCallback(
    (e) => {
      e.preventDefault();
      financeService.postAccounting(Accounting).then(() => {
        getAllAccounting();
        history.push("/Accounting");
      });
    },
    [Accounting, history, getAllAccounting]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setAccounting({ ...Accounting, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Accounting</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createAccounting}>
          <FormGroup>
            <Label for="CommunalCost">CommunalCost</Label>
            <Input
              id="CommunalCost"
              name="CommunalCost"
              placeholder="CommunalCost"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="AdditionalCost">AdditionalCost</Label>
            <Input
              id="AdditionalCost"
              name="AdditionalCost"
              placeholder="AdditionalCost"
              onChange={getElementValues}
              type="text"
            />
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
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateAccounting;