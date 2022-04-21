import { HttpClient } from "../HttpClient";

class SalaryService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllSalaries(){
      return this.get("Salaries");
    }

    getSalaryById(id){
      return this.getById("Salaries", id);
    }

    createSalary(body){
      return this.post("Salaries", body)
    }

    updateSalary(id,body){
      return this.post("Salaries", id, body)
    }
    
    deleteSalary(id){
      return this.delete("Salaries", id);
  }
}

export const SalaryService = new SalaryService();