import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { customerService } from "../../../Api/services/Customers";
import { serviceService } from "../../../Api/services/Services";
import { productService } from "../../../Api/services/Products";



function CreateCustomer() {
  const [state, setState] = useState(true);

  const initialCustomer = {
    fullName: "",
    phoneNumber: "",
    email: "",
    debt: "",
    isNotificationAllowed: state
  };

  const [customer, setCustomer] = useState(initialCustomer);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const history = useHistory();

  const createCustomer = useCallback(
    (e) => {
      e.preventDefault();
      customerService
        .postCustomer(customer)
        .then(() => {
          history.push("/customer");
        })
        .catch((e) => {
          console.log(e.response);
          // if (e.response.status === 400) {
          //   setError(e.response.data.errors.Name);
          // } else if (e.response.status === 500) {
          //   setError(e.response.data);
          // }
        });
    },
    [customer, history]
  );

  function allowNotification() {
    setState(!state);
  }

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
        <h1>Create a new customer</h1>
      </div>
      <div className="AddingAndSearching">
        <div className="Adding">
          <Button onClick={() => history.push("/autostatus")}>
            Customer Auto Status
          </Button>
        </div>
      </div>
      <div className="CreatePage">
        <Form className="forForm" onSubmit={createCustomer}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="fullName">
              FullName
            </Label>
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
            <Label className="forLabel" for="phoneNumber">
              Phone Number
            </Label>
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
            <Label className="forLabel" for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="email"
              onChange={getElementValues}
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="debt">
              Debt
            </Label>
            <Input
              id="debt"
              name="debt"
              placeholder="debt"
              onChange={getElementValues}
              prefix="$"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="rememberMe">
              Allow Notification
            </Label>
            <Input
              addon
              aria-label="Checkbox for following text input"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              defaultChecked= "checked"
              onChange={allowNotification}
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

export default CreateCustomer;
