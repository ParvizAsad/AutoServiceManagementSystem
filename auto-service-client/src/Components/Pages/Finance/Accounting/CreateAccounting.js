import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { financeService } from "../../../../Api/services/Finances";
// import "./Employees/Accountings/CreateEmployee.scss";

const newAccounting = {
  communalCost: " ",
  additionalCost: " ",
  date: " ",
};

function CreateAccounting() {
  const [accounting, setAccounting] = useState(newAccounting);

  const [accountingData, setAccountingData] = useState();
  const history = useHistory();

  const getAllAccounting = useCallback(() => {
    financeService.getAllFinances().then(({ data }) => {
      setAccountingData(data);
    });
  }, [setAccountingData]);

  const createAccounting = useCallback(
    (e) => {
      e.preventDefault();
      financeService.postFinance(accounting).then(() => {
        getAllAccounting();
        history.push("/accounting");
      }).catch(
        e=>{
          console.log(e.response)
      }
      );;
    },
    [accounting, history, getAllAccounting]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setAccounting({ ...accounting, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Accounting</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createAccounting}>
          <FormGroup>
            <Label for="communalCost">CommunalCost</Label>
            <Input
              id="communalCost"
              name="communalCost"
              placeholder="communalCost"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="additionalCost">AdditionalCost</Label>
            <Input
              id="additionalCost"
              name="additionalCost"
              placeholder="additionalCost"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              id="date"
              name="date"
              placeholder="date"
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