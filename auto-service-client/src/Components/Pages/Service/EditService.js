import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { serviceService } from "../../../Api/services/Services";

const service = {
  name: " ",
  detail: " ",
  price: " ",
};
function EditService(props) {
  const [Service, setService] = useState(service);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    serviceService.getServiceById(id).then((res) => {
      setService(res.data);
    });
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
        <h1>Edit {Service.name} Service</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={editService}>
          <FormGroup>
            <Label className="forLabel" for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={(e) => handle(e)}
              value={Service.name}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="detail">Detail</Label>
            <Input
              id="detail"
              name="detail"
              placeholder="detail"
              onChange={(e) => handle(e)}
              value={Service.detail}
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="price">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="price"
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
