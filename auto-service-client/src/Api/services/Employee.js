import { HttpClient } from "../HttpClient";

class EmployeeService extends HttpClient{

constructor(){
    super("https://localhost:44330/api");

}

async getAllEmployee(){
    return await this.get("Employees");
};

async getEmployeeByID(id){
    return await this.getProductByID("Employees", id);
};

async postEmployee(employee){
  return await this.post("Employees", employee).then(response => { 
    console.log(response);
  })
};

async putEmployee(id,employee){
  return await this.put(`Employees/${id}`, employee)
  // .then(response => { 
  //   console.log(response);
  // })
};

async deleteEmployee(id){
  return await this.delete("Employees", id);
};

}

export const employeeService = new EmployeeService()

