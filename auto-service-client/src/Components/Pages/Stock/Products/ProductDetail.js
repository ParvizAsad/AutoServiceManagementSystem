import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { productService } from "../../../../Api/services/Products";

// import "./ProductDetail.scss";

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

  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    productService.getProductById(id).then((res) => {
      setProduct(res.data);
      })
  }, []);

  return (
    <>
      <div className ='ForHeading'>
          <h1>Product Detail</h1>
      </div>
      <div className='DetailPage'>
      <Card>
        <CardImg
          alt="Card image cap"
          src=""
          top
          width="100%"
        />
        <CardBody>
          <CardTitle tag="h5">
            Product Name: {product.name}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Category: {product.categoryId}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Brand: {product.categoryId}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Base Price: {product.basePrice}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Sale Proce: {product.salePrice}
          </CardSubtitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Count: {product.count}
          </CardSubtitle>
        </CardBody>
      </Card>
      </div>
    </>

  )
}

export default ProductDetail