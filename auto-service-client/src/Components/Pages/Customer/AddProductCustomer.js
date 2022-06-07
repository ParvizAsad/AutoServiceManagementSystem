import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Form, Label, Button, Input } from "reactstrap";
import { addProductCustomerService } from "../../../Api/services/AddProductCustomer";
import { customerService } from "../../../Api/services/Customers";
import { productService } from "../../../Api/services/Products";

function AddProductCustomer(props) {
  const initialCustomer = {
    productID: "",
    customerID: props.match.params.id,
    count: " ",
  };
  const [customersProduct, setCustomersProduct] = useState(initialCustomer);
  const [products, setProducts] = React.useState();
  const [data, setData] = React.useState([]);
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
      addProductCustomerService
        .postAddProductCustomer(customersProduct)
        .then(() => {
          props.history.push("/CustumerService/" + props.match.params.id);
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    [customersProduct, history]
  );

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCustomersProduct({ ...customersProduct, [name]: value });
    console.log(customersProduct);
  };

  return (
    <>
      <div className="ForHeading">
        <h1>Add product to {data.fullName} customer</h1>
      </div>
      <div className="CreatePage">
        <Form className="sss" onSubmit={createAddProductCustomer}>
          <FormGroup>
            <Label className="forLabel" for="Products">
              Select Product
            </Label>
            <select
              className="productID"
              onChange={getElementValues}
              name="productID"
              id="productID"
            >
              <option value="0">--Select Product--</option>
              {products?.map((item) => (
                <option key={item.id} value={item.id}>
                    Product :{item.name} || Price: {item.salePrice} || Stock Count: {item.count}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="count">Count</Label>
            <Input
              id="count"
              name="count"
              placeholder="count"
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

export default AddProductCustomer;
