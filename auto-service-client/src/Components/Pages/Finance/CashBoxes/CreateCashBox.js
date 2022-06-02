import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { cashBoxService } from "../../../../Api/services/CashBox";
import { serviceService } from "../../../../Api/services/Services";
import { productService } from "../../../../Api/services/Products";

// import "./Customers/CashBoxs/CreateCustomer.scss";

const newCashBox = {
  CustomerId: " ",
  ServiceId: " ",
  ProductId: " ",
  Payment: " ",
};

function CreateCashBox() {
  const [CashBox, setCashBox] = useState(newCashBox);
  const [customers, setCustomers] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = useState();

  const history = useHistory();

  const createCashBox = useCallback(
    (e) => {
      e.preventDefault();
      cashBoxService
        .postCashBox(CashBox)
        .then(() => {
          history.push("/cashbox");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
        });
    },
    [CashBox, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCashBox({ ...CashBox, [name]: value });
  };

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomers(data);
    });
  }, []);

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
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
        <h1>Create a new CashBox</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createCashBox}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="CustomerId">Select Customer</Label>
            <select
              className="CustomerId"
              onChange={getElementValues}
              name="CustomerId"
              id="CustomerId"
            >
              <option value="0">--Select Customer--</option>
              {customers?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="Services">Select Service</Label>
            <select
              className="ServiceId"
              onChange={getElementValues}
              name="ServiceId"
              id="ServiceId"
            >
              <option value="0">--Select Service--</option>
              {services?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="ProductId">Select Product</Label>
            <select
              className="ProductId"
              onChange={getElementValues}
              name="ProductId"
              id="Productd"
            >
              <option value="0">--Select Product--</option>
              {products?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="Payment">Payment</Label>
            <Input
              id="Payment"
              name="Payment"
              placeholder="Payment"
              onChange={getElementValues}
              // prefix='$'
              min="0"
              type="number"
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
export default CreateCashBox;
