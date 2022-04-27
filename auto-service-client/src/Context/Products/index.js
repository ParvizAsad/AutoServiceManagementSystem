import React from "react";
import { productService } from "../../Api/services/Products";

const ProductContext = React.createContext([]);

function ProductsProvider({ children }) {
  const [products, setProduct] = React.useState([]);

  React.useEffect(() => {
    productService.getAllProducts().then(({ data }) => {
      setProduct(data);
    });
  }, []);

  return (
    <ProductContext.Provider value={[{products}]}>
    <>
      {children}
    </>
     </ProductContext.Provider> 
  );
}

const useProductContext = () => {
  const productContext = React.useContext(ProductContext);
  return productContext;
};

export { useProductContext, ProductsProvider };
