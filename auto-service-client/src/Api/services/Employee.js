import { HttpClient } from "../HttpClient";

const config = { headers: { "Content-Type": "application/json" } };

class EmployeeService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllEmployee() {
    return await this.get("Employees");
  }

  async getEmployeeByID(id) {
    return await this.getById("Employees", id);
  }

  async postEmployee(employee) {
    return await this.post("Employees", employee);
  }

  async putEmployee(id, data) {
    return await this.put("Employees", id, data);
  }

  async deleteEmployee(id) {
    return await this.delete("Employees", id);
  }
}

export const employeeService = new EmployeeService();
