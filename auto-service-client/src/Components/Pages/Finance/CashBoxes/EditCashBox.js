import { FormGroup, Form, Label, Input, Button} from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { cashBoxService } from "../../../../Api/services/CashBox";
import CurrencyInput from 'react-currency-input-field';

// import "./Employees/Cashboxs/CreateEmployee.scss";

const newCashBox= {
  CustomerId: " ",
  Service: " ",
  Product: " ",
  Payment: " ",
};

function EditCashbox(props) {
  const [CashBox, setCashBox] = useState(newCashBox);
  const [customer, setCustomer] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [products, setProducts] = React.useState([]);


  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    cashBoxService.getCashboxById(id).then((res) => {
      setCashBox(res.data);
      })
  }, []);

  const editCashbox = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      cashBoxService.putCashbox(id, CashBox).then(() => {
        history.push("/cashbox");
      });
    },
    [CashBox, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    cashBoxService.getCashboxById(id).then((res) => {
      setCashBox(res.data);
      })
  }, []);

  function handle(e) {
    // const newCashbox = { ...Cashbox };
    // newCashbox[e.target.id] = e.target.value;
    // setCashbox(newCashbox);
    const { name, value } = e.target;
    setCashBox({ ...CashBox, [name]: value });

  }

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {CashBox.name} Cashbox</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editCashbox}>

        <FormGroup>
            <Label for="CustomerId">Select Customer</Label>
            <select className="CustomerId" onChange={(e) => handle(e)}  name="CustomerId" id="CustomerId">
              <option value="0">--Select Customer--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="Services">Select Service</Label>
            <select className="CustomerId" onChange={(e) => handle(e)}  name="CustomerId" id="CustomerId">
              <option value="0">--Select Service--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="Products">Select Product</Label>
            <select className="Products" onChange={(e) => handle(e)}  name="Products" id="Products">
              <option value="0">--Select Product--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
          <Label for="Payment">Payment</Label>
            <CurrencyInput
              id="Payment"
              name="Payment"
              placeholder="Payment"
              onChange={(e) => handle(e)}
              prefix='$'
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditCashbox;