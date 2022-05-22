import { HttpClient } from "../HttpClient";

class FinanceService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllFinances() {
    return await this.get("Finances");
  }

  async getFinanceById(id) {
    return await this.getById("Finances", id);
  }

  async postFinance(body) {
    return await this.post("Finances", body);
  }

  async putFinance(id, body) {
    return await this.put("Finances", id, body);
  }

  async deleteFinance(id) {
    return await this.delete("Finances", id);
  }
}

export const financeService = new FinanceService();
