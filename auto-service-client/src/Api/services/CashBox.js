import { HttpClient } from "../HttpClient";

class CashBoxService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllCashBoxes() {
    return await this.get("CashBoxes");
  }

  async getCashBoxById(id) {
    return await this.getById("CashBoxes", id);
  }

  async postCashBox(body) {
    return await this.post("CashBoxes", body);
  }

  async putCashBox(id, body) {
    return await this.put("CashBoxes", id, body);
  }

  async deleteCashBox(id) {
    return await this.delete("CashBoxes", id);
  }
}

export const cashBoxService = new CashBoxService();
