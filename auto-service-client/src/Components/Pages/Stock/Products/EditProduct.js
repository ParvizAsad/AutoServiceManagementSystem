import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../../Api/services/Categories";
import { brandService } from "../../../../Api/services/Brands";
import { productService } from "../../../../Api/services/Products";

// import "./Employees/products/EditEmployee.scss";

const newProduct = {
  name: " ",
  basePrice: " ",
  salePrice: " ",
  count: " ",
  categoryId: " ",
  brandId: " ",
};

function EditProduct(props) {
  const [product, setProduct] = useState(newProduct);
  const [error, setError] = useState();

  const [productData, setProductData] = useState();

  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);

  const history = useHistory();

  const getAllProduct = useCallback(() => {
    productService.getAllProducts().then(({ data }) => {
      setProductData(data);
    });
  }, [setProductData]);

  useEffect(() => {
    const id = props.match.params.id;
    productService.getProductById(id).then((res) => {
      setProduct(res.data);
    });
  }, []);

  const EditProduct = useCallback(
    (e) => {
      e.preventDefault();
      const id = props.match.params.id;
      productService.putProduct(id, product).then(() => {
        getAllProduct();
        history.push("/product");
      });

      // .catch(
      //   e=>{
      //       if(e.response.status===400){
      //         setError(e.response.data.errors.Name[2])
      //       }
      //       else if(e.response.status===500){
      //         setError(e.response.data)
      //       }
      // }
      // );
    },
    [product, history]
  );

  function handle(e) {
    // const newProduct = { ...product };
    // newProduct[e.target.id] = e.target.value;
    // setBrand(newProduct);

    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  React.useEffect(() => {
    categoryService.getAllCategories().then(({ data }) => {
      setCategory(data);
    });
  }, []);

  React.useEffect(() => {
    brandService.getAllBrands().then(({ data }) => {
      setBrand(data);
    });
  }, []);

  return (
    <>
      <div className="ForHeading">
        <h1>Edit {product.name} Product</h1>
      </div>
      <div className="EditPage">
        <Form onSubmit={EditProduct}>
          {error}
          <FormGroup>
            <Label className="forLabel" for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={(e) => handle(e)}
              value={product.name}
              type="text"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="basePrice">BasePrice</Label>
            <Input
              id="basePrice"
              name="basePrice"
              placeholder="basePrice"
              onChange={(e) => handle(e)}
              value={product.basePrice}
              type="number"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="salePrice">SalePrice</Label>
            <Input
              id="salePrice"
              name="salePrice"
              placeholder="salePrice"
              onChange={(e) => handle(e)}
              value={product.salePrice}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <Label className="forLabel" for="count">Count</Label>
            <Input
              id="count"
              name="count"
              placeholder="count"
              onChange={(e) => handle(e)}
              value={product.count}
              type="number"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="categoryId">Select Category</Label>
            <select
              className="form-control"
              onChange={(e) => handle(e)}
              name="categoryId"
              selected={product.categoryId}
              id="categoryId"
            >
              {category?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label className="forLabel" for="brandId">Select Brand</Label>
            <select
              className="form-control"
              onChange={(e) => handle(e)}
              name="brandId"
              selected={product.brandId}
              id="brandId"
            >
              {brand?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          <Button className="forSubmit" type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default EditProduct;
