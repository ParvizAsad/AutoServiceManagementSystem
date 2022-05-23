import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { discountService } from "../../../../Api/services/Discount";
// import "./Employees/Discounts/CreateEmployee.scss";
import CurrencyInput from "react-currency-input-field";

const newDiscount = {
  name: " ",
  percentage: " ",
  expireDate: " ",
};

function EditDiscount(props) {
  const [discount, setDiscount] = useState(newDiscount);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    discountService.getDiscountById(id).then((res) => {
      setDiscount(res.data);
    });
  }, []);

  const editDiscount = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      discountService.putDiscount(id, discount).then(() => {
        history.push("/marketing");
      });
    },
    [discount, history]
  );

  function handle(e) {
    const { name, value } = e.target;
    setDiscount({ ...discount, [name]: value });
  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {discount.name} Discount</h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={editDiscount}>
          <FormGroup>
            <Label className="forLabel" for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={(e) => handle(e)}
              value={discount.name}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="Percentage">Percentage</Label>
            <Input
              id="Percentage"
              name="Percentage"
              placeholder="Percentage"
              onChange={(e) => handle(e)}
              value={discount.percentage}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="ExpireDate">ExpireDate</Label>
            <Input
              id="ExpireDate"
              name="ExpireDate"
              placeholder="ExpireDate"
              onChange={(e) => handle(e)}
              value={discount.expireDate}
              type="Date"
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditDiscount;
