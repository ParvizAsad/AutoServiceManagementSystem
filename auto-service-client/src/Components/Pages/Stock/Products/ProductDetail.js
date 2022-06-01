import { Card, CardImg, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import React, { useState, useEffect } from "react";
import { productService } from "../../../../Api/services/Products";
import productImage from "../../../../Assets/Images/Products/productImage.jpg";
import { categoryService } from "../../../../Api/services/Categories";
import { brandService } from "../../../../Api/services/Brands";

import "./ProductDetail.scss";

const newProduct = {
  name: " ",
  basePrice: " ",
  salePrice: " ",
  count: " ",
  categoryId: " ",
  brandId: " ",
};

function ProductDetail(props) {
  const [product, setProduct] = useState(newProduct);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    productService.getProductById(id).then((res) => {
      setProduct(res.data);
    });
  }, []);

  useEffect(() => {
    categoryService.getAllCategories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    brandService.getAllBrands().then(({ data }) => {
      setBrands(data);
    });
  }, []);
  return (
    <>
      <div className="ForHeading">
        <h1>Product Detail</h1>
      </div>
      <div className="DetailPage">
        <Card className="forCard">
          <CardImg
            className="forImg"
            alt="Card image cap"
            src={productImage}
            top
            width="100%"
          />
          <CardBody>
            <CardTitle className="Title" tag="h5">
              Product Name:
              {product.name}
            </CardTitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Category:{" "}
              {categories
                ?.filter((category) => category.id === product.categoryId)
                .map((category) => (
                  <span>{category.name}</span>
                ))}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Brand:{" "}
              {brands
                ?.filter((brand) => brand.id === product.brandId)
                .map((brand) => (
                  <span>{brand.name}</span>
                ))}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Base Price: {product.basePrice}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Sale Price: {product.salePrice}
            </CardSubtitle>
            <CardSubtitle className="forSubtitle" tag="h6">
              Count: {product.count}
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default ProductDetail;
