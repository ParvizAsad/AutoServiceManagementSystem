import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { cashBoxService } from "../../../../Api/services/CashBox";
import CurrencyInput from "react-currency-input-field";
import { productService } from "../../../../Api/services/Products";
import { serviceService } from "../../../../Api/services/Services";

const newCashBox = {
  customerId: " ",
  serviceId: " ",
  productId: " ",
  payment: " ",
};

function EditCashbox(props) {
  const [cashBox, setCashBox] = useState(newCashBox);
  const [customers, setCustomers] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [name, setName] = React.useState("hhh");

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    cashBoxService.getCashBoxById(id).then((res) => {
      setCashBox(res.data);
    });
  }, []);

  const editCashbox = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      cashBoxService.putCashBox(id, cashBox).then(() => {
        history.push("/cashbox");
      });
    },
    [cashBox, history]
  );

  function handle(e) {
    const { name, value } = e.target;
    setCashBox({ ...cashBox, [name]: value });
  }

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomers(data);
    });
  }, []);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="ForHeading">
        <h1>
          Edit payment of <span> </span>
          {customers
            ?.filter((customer) => customer.id === cashBox.customerId)
            .map((customer) => customer.fullName)}
        </h1>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={editCashbox}>
          <FormGroup>
            <Label className="forLabel" for="customerId">Select Customer</Label>
            <select
              className="customerId"
              onChange={(e) => handle(e)}
              name="customerId"
              id="customerId"
            >
              <option value="0">--Select Customer--</option>
              {customers?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="serviceId">Select Service</Label>
            <select
              className="serviceId"
              onChange={(e) => handle(e)}
              name="serviceId"
              id="serviceId"
            >
              <option value="0">--Select Service--</option>
              {services?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="productId">Select Product</Label>
            <select
              className="productId"
              onChange={(e) => handle(e)}
              name="productId"
              id="productId"
            >
              <option value="0">--Select Product--</option>
              {products?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="payment">Payment AZN</Label>
            <Input
              id="payment"
              name="payment"
              placeholder="payment"
              onChange={(e) => handle(e)}
              min="0"
              value={cashBox.payment}
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditCashbox;
