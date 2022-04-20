import { HttpClient } from "../HttpClient";

class EmployeeService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllEmployees(){
      return this.get("employees");
    }

    getEmployeesById(id){
      return this.getById("employees", id);
    }
}

export const employeeService = new EmployeeService();