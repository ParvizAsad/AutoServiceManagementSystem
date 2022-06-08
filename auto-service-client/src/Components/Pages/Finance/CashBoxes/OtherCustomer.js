import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { productService } from "../../../../Api/services/Products";
import { otherCustomerService } from "../../../../Api/services/OtherCustomer";

const initialValue = {
  customerName: " ",
  productID: " ",
  productCount: " ",
  payment: " ",
};
function OtherCustomer() {
  const [otherCustomer, setOtherCustomer] = useState(initialValue);
  const [product, setProduct] = useState();
  const history = useHistory();

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setOtherCustomer({ ...otherCustomer, [name]: value });
  };

  const createOtherCustomerPayment = useCallback(
    (e) => {
      e.preventDefault();
      otherCustomerService
        .postOtherCustomer(otherCustomer)
        .then(() => {
          history.push("/cashbox");
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    [otherCustomer, history]
  );

  return (
    <>
      <div className="ForHeading">
        <h1>Add service to customer</h1>
      </div>
      <div className="CreatePage">

        <Form className="sss" onSubmit={createOtherCustomerPayment}>
        <FormGroup>
          <Label className="forLabel" for="customerName">
            Customer Name
          </Label>
          <Input
            id="customerName"
            name="customerName"
            placeholder="customerName"
            onChange={getElementValues}
            type="text"
          />
        </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="productID">
              Select Product
            </Label>
            <select
              className="productID"
              onChange={getElementValues}
              name="productID"
              id="productID"
            >
              <option value="0">--Select Product--</option>
              {product?.map((item) => (
                <option key={item.id} value={item.id}>
                  Product :{item.name} || Price: {item.salePrice}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="productCount">
              Product Count
            </Label>
            <Input
              id="productCount"
              name="productCount"
              placeholder="productCount"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="payment">
              Payment
            </Label>
            <Input
              id="payment"
              name="payment"
              placeholder="payment"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default OtherCustomer;
