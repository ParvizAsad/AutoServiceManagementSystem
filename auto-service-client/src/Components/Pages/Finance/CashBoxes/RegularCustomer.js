import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../../Api/services/Customers";
import { regularCustomerService } from "../../../../Api/services/RegularCustomer";

const initialValue = {
    customerID: " ",
  payment: " ",
};

function RegularCustomer() {
  const [regularCustomer, setRegularCustomer] = useState(initialValue);
  const [customers, setCustomers] = React.useState([]);
  const history = useHistory();

  React.useEffect(() => {
    customerService.getAllCustomers().then(({ data }) => {
      setCustomers(data);
      console.log(data)
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setRegularCustomer({ ...regularCustomer, [name]: value });
  };

  const createRegularCustomerPayment = useCallback(
    (e) => {
      e.preventDefault();
      regularCustomerService
      .postRegularCustomer(regularCustomer)
        .then(() => {
          history.push("/cashbox");
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    [regularCustomer, history]
  );

  return (
    <>
      <div className="ForHeading">
        <h1>Add service to customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createRegularCustomerPayment}>
          <FormGroup>
            <Label className="forLabel" for="Services">
              Select customer
            </Label>
            <select
              className="customerID"
              onChange={getElementValues}
              name="customerID"
              id="customerID"
            >
              <option value="0">--Select Service--</option>
              {customers?.map((item) => (
                <option key={item.id} value={item.id}>
                  Customers :{item.fullName} || Debt: {item.debt}
                </option>
              ))}
            </select>
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

export default RegularCustomer;
