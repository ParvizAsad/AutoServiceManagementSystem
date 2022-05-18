import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { taxService } from "../../../../Api/services/Taxes";
// import "./Employees/taxs/CreateEmployee.scss";

const newTax= {
  Name: " ",
  taxValue: " ",
};

function CreateTax() {
  const [tax, setTax] = useState(newTax);

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
      });
    },
    [tax, history, getAllTax]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setTax({ ...tax, [name]: value });
  };


  return (
    <>
      <div className="ForHeading">
        <h1>Create a new tax</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createTax}>
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
          <FormGroup>
            <Label for="taxValue">Tax Value</Label>
            <Input
              id="taxValue"
              name="taxValue"
              placeholder="Tax value"
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
export default CreateTax;