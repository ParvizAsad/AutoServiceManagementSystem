import { HttpClient } from "../HttpClient";

class SalaryService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllSalaries() {
    return await this.get("Salaries");
  }

  async getSalaryById(id) {
    return await this.getById("Salaries", id);
  }

  async postSalary(body) {
    return await this.post("Salaries", body);
  }

  async putSalary(id, body) {
    return await this.put("Salaries", id, body);
  }

  async deleteSalary(id) {
    return await this.delete("Salaries", id);
  }
}

export const salaryService = new SalaryService();
