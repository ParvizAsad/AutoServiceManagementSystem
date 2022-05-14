import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { brandService } from "../../../../Api/services/Brands";
// import "./Employees/Brands/CreateEmployee.scss";

const newBrand= {
  name: " ",
};

function EditBrand(props) {
  const [brand, setBrand] = useState(newBrand);
  
  const history = useHistory();
  
  useEffect(() => {
    const id = props.match.params.id;
    brandService.getBrandById(id).then((res) => {
      setBrand(res.data);
      })
  }, []);

  const editBrand = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      brandService.putBrand(id, brand).then(() => {
        history.push("/brand");
      });
    },
    [brand, history]
  );



  function handle(e) {
    const newbrand = { ...brand };
    newbrand[e.target.id] = e.target.value;
    setBrand(newbrand);

    // const { name, value } = e.target;
    // setBrand({ ...brand, [name]: value });

  }

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {brand.name} Brand</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={editBrand}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={(e) => handle(e)}
              value={brand.name}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}
export default EditBrand;