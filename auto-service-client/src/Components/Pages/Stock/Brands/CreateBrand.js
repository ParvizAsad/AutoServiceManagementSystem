import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { brandService } from "../../../../Api/services/Brands";
// import "./Employees/Brands/CreateEmployee.scss";

const newBrand = {
  Name: " ",
};

function CreateBrand() {
  const [brand, setBrand] = useState(newBrand);

  const [brandData, setBrandData] = useState();
  const history = useHistory();

  const getAllBrand = useCallback(() => {
    brandService.getAllBrands().then(({ data }) => {
      setBrandData(data);
    });
  }, [setBrandData]);

  const createBrand = useCallback(
    (e) => {
      e.preventDefault();
      brandService.postBrand(brand).then(() => {
        getAllBrand();
        history.push("/brand");
      });
    },
    [brand, history, getAllBrand]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Brand</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createBrand}>
          <FormGroup>
            <Label for="Name">Name</Label>
            <Input
              id="Name"
              name="Name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateBrand;