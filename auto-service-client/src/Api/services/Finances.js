import { HttpClient } from "../HttpClient";

class FinanceService extends HttpClient {
    
    constructor(){
        super(" ");
    }

    async getAllFinances(){
      return await this.get("Finances");
    }

    async getFinanceById(id){
      return await this.getById("Finances", id);
    }

    async postFinance(body){
      return await this.post("Finances", body)
    }

    async updateFinance(id,body){
      return await this.post("Finances", id, body)
    }
    
    async deleteFinance(id){
      return await this.delete("Finances", id);
  }
}

export const financeService = new FinanceService();