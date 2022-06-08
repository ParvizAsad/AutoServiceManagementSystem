import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { brandService } from "../../../../Api/services/Brands";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const newBrand = {
  name: " ",
};
const errorValues = {
  // error: [ ] || { },
  errorValue: [],
};
function CreateBrand() {
  const [brand, setBrand] = useState(newBrand);
  const [error, setError] = useState();
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
          let errorCode = e.response.status;
          console.log(e.response.status);
          console.log(errorCode);

          switch (errorCode) {
            case 400:
              console.log("test");
              toast.error(`* marked inputs must be filled`)


              break;
              case 402:

  
                break;
            case 403:

              break;
            case 404:

              break;
              case 500:
                toast.error(`There are already`)
                break;
            default:
            
              break;
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
      <ToastContainer />
      <div className="CreatePage">
        <Form className="sss" onSubmit={createBrand}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="name">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Name"
              onChange={getElementValues}
              type="text"
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

export default CreateBrand;
