import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { cashBoxService } from "../../../../Api/services/CashBox";
// import "./Customers/CashBoxs/CreateCustomer.scss";

const newCashBox= {
  CustomerId: " ",
  Service: " ",
  Product: " ",
  Payment: " ",
};

function CreateCashBox() {
  const [CashBox, setCashBox] = useState(newCashBox);
  const [customer, setCustomer] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [error, setError] = useState();

  const [CashBoxData, setCashBoxData] = useState();
  const history = useHistory();

  const getAllCashBox = useCallback(() => {
    cashBoxService.getAllCashBoxes().then(({ data }) => {
      setCashBoxData(data);
    });
  }, [setCashBoxData]);

  const createCashBox = useCallback(
    (e) => {
      e.preventDefault();
      cashBoxService.postCashBox(CashBox).then(() => {
        getAllCashBox();
        history.push("/cashbox");
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
    [CashBox, history, getAllCashBox]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCashBox({ ...CashBox, [name]: value });
  };

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomer(data);
    });
  }, []);

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
        <h1>Create a new CashBox</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createCashBox}>
          {error}
        <FormGroup>
            <Label for="CustomerId">Select Customer</Label>
            <select className="CustomerId" onChange={getElementValues}  name="CustomerId" id="CustomerId">
              <option value="0">--Select Customer--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.fullName}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="Services">Select Service</Label>
            <select className="CustomerId" onChange={getElementValues}  name="CustomerId" id="CustomerId">
              <option value="0">--Select Service--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="Products">Select Product</Label>
            <select className="Products" onChange={getElementValues}  name="Products" id="Products">
              <option value="0">--Select Product--</option>
              {customer?.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.Name}
                </option>
              ))}
            </select>
          </FormGroup>
            {error}
          <FormGroup>
            <Label for="Payment">Payment</Label>
            <Input
              id="Payment"
              name="Payment"
              placeholder="Payment"
              onChange={getElementValues}
              type="number"
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
export default CreateCashBox;