import React from "react";
import { employeeService } from "../../Api/services/Employee";

const EmployeeContext = React.createContext([]);

function EmployeesProvider({ children }) {
  const [employees, setEmployee] = React.useState([]);

  React.useEffect(() => {
    employeeService.getAllEmployee().then(({ data }) => {
      setEmployee(data);
    });
  }, []);

  return (
    <EmployeeContext.Provider value={[{employees}]}>
    <>
      {children}
    </>
     </EmployeeContext.Provider> 
  );
}

const useEmployeeContext = () => {
  const employeeContext = React.useContext(EmployeeContext);
  return employeeContext;
};

export { useEmployeeContext, EmployeesProvider };
