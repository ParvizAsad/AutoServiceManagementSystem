import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { customerService } from "../../../Api/services/Customers";
import { addServiceCustomerService } from "../../../Api/services/AddServiceCustomer";
import { serviceService } from "../../../Api/services/Services";

function AddServiceCustomer(props) {
  const initialCustomer = {
    serviceID: "",
    customerID: props.match.params.id,
  };
  const [customerService, setCustomerService] = useState(initialCustomer);
  const [services, setServices] = React.useState();
  const history = useHistory();

  const createAddServiceCustomer = useCallback(
    (e) => {
      e.preventDefault();
      addServiceCustomerService
        .postAddServiceCustomer(customerService)
        .then(() => {
          props.history.push("/CustumerService/" + props.match.params.id);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    [customerService, history]
  );

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCustomerService({ ...customerService, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Add service to customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createAddServiceCustomer}>
          <FormGroup>
            <Label className="forLabel" for="Services">
              Select Service
            </Label>
            <select
              className="serviceID"
              onChange={getElementValues}
              name="serviceID"
              id="serviceID"
            >
              <option value="0">--Select Service--</option>
              {services?.map((item) => (
                <option key={item.id} value={item.id}>
                  Service :{item.name} || Price: {item.price}
                </option>
              ))}
            </select>
          </FormGroup>
         
          <Button className="forSubmit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddServiceCustomer;
