import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../Api/services/Categories";
import { brandService } from "../../../Api/services/Brands";
import { productService } from "../../../Api/services/Products";

// import "./Employees/products/CreateEmployee.scss";

const newProduct= {
  Name: " ",
  BasePrice: " ",
  SalePrice: " ",
  Count: " ",
  Category: " ",
  Brand: " ",
  
};

function CreateProduct() {
  const [product, setProduct] = useState(newProduct);

  const [productData, setProductData] = useState();

  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);

  const history = useHistory();

  const getAllProduct = useCallback(() => {
    productService.getAllProduct().then(({ data }) => {
      setProductData(data);
    });
  }, [setProductData]);

  const createProduct = useCallback(
    (e) => {
      e.preventDefault();
      productService.postProduct(product).then(() => {
        getAllProduct();
        history.push("/product");
      });
    },
    [product, history, getAllProduct]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  React.useEffect(() => {
    categoryService.getAllCategories().then(({ data }) => {
      setBrand(data);
    });
  }, []);

  React.useEffect(() => {
    brandService.getAllBrands().then(({ data }) => {
      setCategory(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Product</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createProduct}>
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
          <FormGroup>
            <Label for="BasePrice">BasePrice</Label>
            <Input
              id="BasePrice"
              name="BasePrice"
              placeholder="BasePrice"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="SalePrice">SalePrice</Label>
            <Input
              id="SalePrice"
              name="SalePrice"
              placeholder="SalePrice"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="Count">Count</Label>
            <Input
              id="Count"
              name="Count"
              placeholder="Count"
              onChange={getElementValues}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label for="categoryId">Select Category</Label>
            <select className="form-control" name="categoryId" id="categoryId">
                            <option value="0">--Select Category--</option>
                            {category?.map((item, idx) => (
                            <option key={idx} value={idx}>{item.name}</option>
                            ))}
                    </select>

          </FormGroup>
          <FormGroup>
            <Label for="brandId">Select Brand</Label>
            <select className="form-control" name="brandId" id="brandId">
                            <option value="0">--Select Category--</option>
                            {brand?.map((item, idx) => (
                            <option key={idx} value={idx}>{item.name}</option>
                            ))}
                    </select>

          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default CreateProduct;