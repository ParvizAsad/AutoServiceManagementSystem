import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { serviceService } from "../../../Api/services/Services";
// import "./Employees/Services/CreateEmployee.scss";

const service = {
  Name: " ",
  Detail: " ",
  Price: " ",
};
function EditService(props) {
  const [Service, setService] = useState(service);
  
  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    serviceService.getServiceById(id).then((res) => {
      setService(res.data);
      })
  }, []);

  const editService = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      serviceService.putService(id, Service).then(() => {
        history.push("/service");
      });
    },
    [Service, history]
  );



  function handle(e) {
    const newService = { ...Service };
    newService[e.target.id] = e.target.value;
    setService(newService);

    // const { name, value } = e.target;
    // setService({ ...Service, [name]: value });

  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {Service.Name} Service</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editService}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={(e) => handle(e)}
              value={Service.name}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Detail">Detail</Label>
            <Input
              id="Detail"
              name="Detail"
              placeholder="Detail"
              onChange={(e) => handle(e)}
              value={Service.detail}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Price">Price</Label>
            <Input
              id="Price"
              name="Price"
              placeholder="Price"
              onChange={(e) => handle(e)}
              value={Service.price}
              type="number"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditService;