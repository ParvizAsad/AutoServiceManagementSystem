import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { financeService } from "../../../../Api/services/Finances";
import CurrencyInput from 'react-currency-input-field';

// import "./Employees/Accountings/CreateEmployee.scss";

const newAccounting = {
  communalCost: " ",
  additionalCost: " ",
  date: " ",
};

function CreateAccounting() {
  const [accounting, setAccounting] = useState(newAccounting);
  const [error, setError] = useState();

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
            if(e.response.status===400){
              setError(e.response.data.errors.Name)
              console.log({error});

            }
            else if(e.response.status===500){
              setError(e.response.data)
            }
      }
      );
    },
    [accounting, history, getAllAccounting]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setAccounting({ ...accounting, [name]: value });
  };

  const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

const preventPasteNegative = (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = parseFloat(clipboardData.getData('text'));

  if (pastedData < 0) {
      e.preventDefault();
  }
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
            <CurrencyInput
              id="communalCost"
              name="communalCost"
              placeholder="communalCost"
              prefix='$'
              onChange={getElementValues}
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label for="additionalCost">AdditionalCost</Label>
            <CurrencyInput
              id="additionalCost"
              name="additionalCost"
              placeholder="additionalCost"
              onChange={getElementValues}
              prefix='$'
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          {error} 
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