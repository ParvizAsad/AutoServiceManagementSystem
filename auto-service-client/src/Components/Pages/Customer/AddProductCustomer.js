import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Button } from "reactstrap";
import { addProductCustomerService } from "../../../Api/services/AddProductCustomer";
import { customerService } from "../../../Api/services/Customers";
import { productService } from "../../../Api/services/Products";



const initialCustomer = {
  fullName: "",
};
function AddProductCustomer(props) {
  const [data, setData] = useState(initialCustomer);

  const newProductForCustomer = {
    id: " ",
    CustomerId: data.fullName,
    ProductIds: [],
  };
  const [productForCustomer, setProductForCustomer] = useState(newProductForCustomer);
  
  const [error, setError] = useState();
  const [products, setProducts] = React.useState([]);

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    customerService.getCustomerById(id).then((res) => {
      setData(res.data);
    });
  }, []);
  
  const createAddProductCustomer = useCallback(
    (e) => {
      e.preventDefault();
      addProductCustomerService.postAddProductCustomer(productForCustomer)
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
    [productForCustomer, history]
  );

  useEffect(() => {
    const id = props.match.params.id;
    addProductCustomerService.getAddProductCustomerById(id).then((res) => {
      setProductForCustomer(res.data);
    });
  }, []);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setProductForCustomer({ ...productForCustomer, [name]: value });
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Add product to {data.fullName} customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createAddProductCustomer}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="Products">Select Product</Label>
            <select
              className="ProductId"
              onChange={getElementValues}
              name="ProductId"
              id="ProductId"
            >
              <option value="0">--Select Product--</option>
              {products?.map((item, idx) => (
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

export default AddProductCustomer