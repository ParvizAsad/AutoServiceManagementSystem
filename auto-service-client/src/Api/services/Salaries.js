import { HttpClient } from "../HttpClient";

class SalaryService extends HttpClient {
    
    constructor(){
        super("");
    }

    async getAllSalaries(){
      return await this.get("Salaries");
    }

    async getSalaryById(id){
      return await this.getById("Salaries", id);
    }

    async postSalary(body){
      return await this.post("Salaries", body)
    }

    async updateSalary(id,body){
      return await this.post("Salaries", id, body)
    }
    
    async deleteSalary(id){
      return await this.delete("Salaries", id);
  }
}

export const salaryService = new SalaryService();