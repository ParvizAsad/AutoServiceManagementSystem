import React from "react";
import { productService } from "../../Api/Service/ProductService";

const EmployeeContext = React.createContext([]);

function EmployeesProvider({ children }) {
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

const useEmployeeContext = () => {
  const employeeContext = React.useContext(EmployeeContext);
  return employeeContext;
};

export { useEmployeeContext, EmployeesProvider };
