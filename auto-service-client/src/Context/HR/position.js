import React from "react";
import { productService } from "../../Api/Service/ProductService";

const PositionContext = React.createContext([]);

function PositionsProvider({ children }) {
  const [state, setState] = React.useState(false);
  const [user, setUser] = React.useState([]);

  // React.useEffect(() => {
  //   productService.getAllUsers().then(({ data }) => {
  //     setUser(data);
  //   });
  // }, []);

  return (
    // <ProductContext.Provider value={[{ state, setState }]}>
    <>
      {children}
    </>
    //  </ProductContext.Provider> 
  );
}

const usePositionContext = () => {
  const positionContext = React.useContext(PositionContext);
  return positionContext;
};

export { usePositionContext, PositionsProvider };
