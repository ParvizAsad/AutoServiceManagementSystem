import { FormGroup, Form, Label, Input, Button } from "reactstrap";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { categoryService } from "../../../../Api/services/Categories";
import { brandService } from "../../../../Api/services/Brands";
import { productService } from "../../../../Api/services/Products";

// import "./Employees/products/CreateEmployee.scss";

const newProduct = {
  name: " ",
  basePrice: " ",
  salePrice: " ",
  count: " ",
  categoryId: " ",
  brandId: " ",
};

function CreateProduct() {
  const [product, setProduct] = useState(newProduct);
  const [error, setError] = useState();

  // const [productData, setProductData] = useState();

  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);

  const history = useHistory();

  // const getAllProduct = useCallback(() => {
  //   productService.getAllProduct().then(({ data }) => {
  //     setProductData(data);
  //   });
  // }, [setProductData]);

  const createProduct = useCallback(
    (e) => {
      e.preventDefault();
      productService.postProduct(product).then(() => {
        // getAllProduct();
        history.push("/product");
      })
      .catch(
        e=>{
          if(e.response.status===400){
            setError(e.response.data.errors.Name)
            console.log({error});
            }
            else if(e.response.status===500){
              setError(e.response.data)
            }
      }
      );
    },
    [product, history]
  );

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    console.log(product);
  };

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

  const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

const preventPasteNegative = (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = parseFloat(clipboardData.getData('text'));

  if (pastedData < 0) {
      e.preventDefault();
  }
};

  return (
    <>
      <div className="ForHeading">
        <h1>Create a new Product</h1>
      </div>
      <div className="CreatePage">
        <Form onSubmit={createProduct}>
        {error}
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="name"
              onChange={getElementValues}
              type="text"
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="basePrice">BasePrice</Label>
            <Input
              id="basePrice"
              name="basePrice"
              placeholder="basePrice"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="salePrice">SalePrice</Label>
            <Input
              id="salePrice"
              name="salePrice"
              placeholder="salePrice"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
          <FormGroup>
            <Label for="count">Count</Label>
            <Input
              id="count"
              name="count"
              placeholder="count"
              onChange={getElementValues}
              type="number"
              min="0"
              onPaste={preventPasteNegative}
              onKeyPress={preventMinus}
            />
          </FormGroup>
                  {error}
          <FormGroup>
            <Label for="categoryId">Select Category</Label>
            <select
              className="form-control"
              onChange={getElementValues}
              name="categoryId"
              id="categoryId"
            >
              <option value="0">--Select Category--</option>
              {category?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </FormGroup>
          {error}
          <FormGroup>
            <Label for="brandId">Select Brand</Label>
            <select className="form-control"
              onChange={getElementValues} name="brandId" id="brandId">
              <option value="0">--Select Brand--</option>
              {brand?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
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
