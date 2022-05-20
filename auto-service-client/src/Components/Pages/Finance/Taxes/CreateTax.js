import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";
import CurrencyInput from 'react-currency-input-field';
// import "./Employees/taxs/CreateEmployee.scss";

const newTax= {
  Name: " ",
  taxValue: " ",
};

function CreateTax() {
  const [tax, setTax] = useState(newTax);
  const [error, setError] = useState([]);

  const [taxData, setTaxData] = useState();
  const history = useHistory();

  const getAllTax = useCallback(() => {
    taxService.getAllTaxes().then(({ data }) => {
      setTaxData(data);
    });
  }, [setTaxData]);

  const createTax = useCallback(
    (e) => {
      e.preventDefault();
      taxService.postTax(tax).then(() => {
        getAllTax();
        console.log(tax);
        history.push("/tax");
      }).catch(
        e=>{
            if(e.response.status===400){
              setError(e.response.data.errors.Name)
              console.log(error);

            }
            else if(e.response.status===500){
              setError(e.response.data)
            }
      }
      );
    },
    [tax, history, getAllTax]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setTax({ ...tax, [name]: value });
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
        <h1>Create a new tax</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createTax}>
        {error}
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="taxValue">Tax Value</Label>
            <CurrencyInput
              id="taxValue"
              name="taxValue"
              placeholder="Tax value"
              onChange={getElementValues}
              prefix='$'
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default CreateTax;