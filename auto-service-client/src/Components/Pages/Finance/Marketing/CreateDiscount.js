import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { discountService } from "../../../../Api/services/Discount";
// import "./Employees/Discounts/CreateEmployee.scss";
import CurrencyInput from 'react-currency-input-field';

const newDiscount= {
  Name: " ",
  Percentage: " ",
  ExpireDate: " ",
};

function CreateDiscount() {
  const [Discount, setDiscount] = useState(newDiscount);
  const [error, setError] = useState();

  const [DiscountData, setDiscountData] = useState();
  const history = useHistory();

  const getAllDiscount = useCallback(() => {
    discountService.getAllDiscounts().then(({ data }) => {
      setDiscountData(data);
    });
  }, [setDiscountData]);

  const createDiscount = useCallback(
    (e) => {
      e.preventDefault();
      discountService.postDiscount(Discount).then(() => {
        getAllDiscount();
        history.push("/marketing");
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
    [Discount, history, getAllDiscount]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setDiscount({ ...Discount, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Discount</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createDiscount}>
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
            <Label for="Percentage">Percentage</Label>
            <Input
              id="Percentage"
              name="Percentage"
              placeholder="Percentage"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="ExpireDate">ExpireDate</Label>
            <Input
              id="ExpireDate"
              name="ExpireDate"
              placeholder="ExpireDate"
              onChange={getElementValues}
              type="Date"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateDiscount;