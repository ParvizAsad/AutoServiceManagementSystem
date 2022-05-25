import { FormGroup, Form, Label, Input, Button, FormText } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { brandService } from "../../../../Api/services/Brands";

const newBrand = {
  name: " ",
};
const errorValues = {
  errorValue: [],
};
function CreateBrand() {
  const [brand, setBrand] = useState(newBrand);
  const [error, setError] = useState();
  const [arrError, setArrError] = useState(errorValues);
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
      brandService
        .postBrand(brand)
        .then(() => {
          getAllBrand();
          history.push("/brand");
        })
        .catch((e) => {
          if (e.response.status === 400) {
            setError(e.response.data.errors.Name[0]);
          } else if (e.response.status === 500) {
            setError(e.response.data);
          }
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
          {error}
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
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
