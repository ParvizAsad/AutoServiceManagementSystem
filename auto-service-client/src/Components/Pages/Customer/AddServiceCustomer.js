import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import { customerService } from "../../../Api/services/Customers";
import { addServiceCustomerService } from "../../../Api/services/AddServiceCustomer";
import { serviceService } from "../../../Api/services/Services";



const initialCustomer = {
  fullName: "",
};

function AddServiceCustomer(props) {

  const [data, setData] = useState(initialCustomer);
  
  const newServiceForCustomer = {
    id: " ",
    CustomerId: data.fullName,
    ServiceIds: [],
  };
  const [serviceForCustomer, setServiceForCustomer] = useState(newServiceForCustomer);
  const [error, setError] = useState();
  const [services, setServices] = React.useState([]);

  

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
    });
  }, []);
  

  const createAddServiceCustomer = useCallback(
    (e) => {
      e.preventDefault();
      addServiceCustomerService.postAddServiceCustomer(serviceForCustomer)
        .then(() => {
          history.push("/customer");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
        });
    },
    [serviceForCustomer, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    addServiceCustomerService.getAddServiceCustomerById(id).then((res) => {
      setServiceForCustomer(res.data);
    });
  }, []);

  React.useEffect(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServices(data);
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setServiceForCustomer({ ...serviceForCustomer, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Add service to {data.fullName} customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createAddServiceCustomer}>
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

          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  )
}

export default AddServiceCustomer