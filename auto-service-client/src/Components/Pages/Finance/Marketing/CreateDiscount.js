import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { discountService } from "../../../../Api/services/Discount";
// import "./Employees/Discounts/CreateEmployee.scss";

const newDiscount= {
  Name: " ",
  Percentage: " ",
  ExpireDate: " ",
};

function CreateDiscount() {
  const [Discount, setDiscount] = useState(newDiscount);

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
        history.push("/Discount");
      });
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
            <Label for="Percentage">Percentage</Label>
            <Input
              id="Percentage"
              name="Percentage"
              placeholder="Percentage"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="ExpireDate">ExpireDate</Label>
            <Input
              id="ExpireDate"
              name="ExpireDate"
              placeholder="ExpireDate"
              onChange={getElementValues}
              type="ExpireDate"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateDiscount;