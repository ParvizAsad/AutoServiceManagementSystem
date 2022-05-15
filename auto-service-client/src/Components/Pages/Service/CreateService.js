import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
// import "./CreateService.scss";
import { serviceService } from "../../../Api/services/Services";

const service = {
  name: " ",
  detail: " ",
  price: " ",
};

function CreateService() {
  const [Service, setService] = useState(service);
  const [position, setPosition] = React.useState([]);

  const [ServiceData, setServiceData] = useState();
  const history = useHistory();

  const getAllService = useCallback(() => {
    serviceService.getAllServices().then(({ data }) => {
      setServiceData(data);
    });
  }, [setServiceData]);

  const createService = useCallback(
    (e) => {
      e.preventDefault();
      serviceService.postService(Service).then(() => {
        history.push("/service");
      });
    },
    [Service, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setService({ ...Service, [name]: value });
    console.log(Service);
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Service</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createService}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="detail">Detail </Label>
            <Input
              id="detail"
              name="detail"
              placeholder="detail"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="price"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateService;
