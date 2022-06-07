import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { cashBoxService } from "../../../../Api/services/CashBox";
import { productService } from "../../../../Api/services/Products";
import { serviceService } from "../../../../Api/services/Services";

// import "./Employees/Cashboxs/CreateEmployee.scss";

const newCashBox = {
  CustomerId: " ",
  Service: " ",
  Product: " ",
  Payment: " ",
};

function EditCashbox(props) {
  const [CashBox, setCashBox] = useState(newCashBox);
  const [customers, setCustomers] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [products, setProducts] = React.useState([]);

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
      cashBoxService.putCashBox(id, CashBox).then(() => {
        history.push("/cashbox");
      });
    },
    [CashBox, history]
  );

  function handle(e) {
    const { name, value } = e.target;
    setCashBox({ ...CashBox, [name]: value });
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
          Edit payment of{" "}
          {customers
            ?.filter((customer) => customer.id === CashBox.customerID)
            .map((customer) => customer.fullName)}
        </h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={editCashbox}>
          <FormGroup>
            <Label className="forLabel" for="CustomerId">Select Customer</Label>
            <select
              className="CustomerId"
              onChange={(e) => handle(e)}
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
          <FormGroup>
            <Label className="forLabel" for="Services">Select Service</Label>
            <select
              className="CustomerId"
              onChange={(e) => handle(e)}
              name="CustomerId"
              id="CustomerId"
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
            <Label className="forLabel" for="Products">Select Product</Label>
            <select
              className="Products"
              onChange={(e) => handle(e)}
              name="Products"
              id="Products"
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
            <Label className="forLabel" for="Payment">Payment</Label>
            <Input
              id="Payment"
              name="Payment"
              placeholder="Payment"
              onChange={(e) => handle(e)}
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
export default EditCashbox;
