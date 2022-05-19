import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./Createcustomer.scss";
import { customerService } from "../../../Api/services/Customers";
import { serviceService } from "../../../Api/services/Services";
import { productService } from "../../../Api/services/Products";

const initialCustomer = {
  fullName: "",
  phoneNumber: "",
  email: "",
  debt: "",
  ServiceIds: [],
  ProductIds: [],
};

function CreateCustomer() {
  const [customer, setCustomer] = useState(initialCustomer);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const [customerData, setCustomerData] = useState();
  const history = useHistory();

  const getAllCustomer = useCallback(() => {
    customerService.getAllCustomer().then(({ data }) => {
      setCustomerData(data);
    });
  }, [setCustomerData]);

  const createCustomer = useCallback(
    (e) => {
      e.preventDefault();
      customerService.postCustomer(customer).then(() => {
        history.push("/customer");
      }).catch(
        e=>{
            if(e.response.status===400){
              setError(e.response.data.errors.Name)
              console.log({error});

            }
            else if(e.response.status===500){
              setError(e.response.data)
            }
      }
      );
    },
    [customer, history]
  );

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

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

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
        <h1>Create a new customer</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createCustomer}>
          {error}
          <FormGroup>
            <Label for="fullName">FullName</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="fullName"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phoneNumber"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="email"
              onChange={getElementValues}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="debt">Debt</Label>
            <Input
              id="debt"
              name="debt"
              placeholder="debt"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label for="ServiceIds">Select Service</Label>
            <select
              // multiple={true}
              className="ServiceIds"
              onChange={getElementValues}
              name="ServiceIds"
              id="ServiceIds"

            >
              <option value="0">--Select Service--</option>
              {services?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label for="ProductIds">Select Product</Label>
            <select
              // multiple={true}
              className="ProductIds"
              onChange={getElementValues}
              name="ProductIds"
              id="ProductIds"

            >
              <option value="0">--Select Product--</option>
              {products?.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateCustomer;
