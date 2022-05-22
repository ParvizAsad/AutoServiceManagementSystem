import { HttpClient } from "../HttpClient";

class TaxService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllTaxes() {
    return await this.get("Taxes");
  }

  async getTaxById(id) {
    return await this.getById("Taxes", id);
  }

  async postTax(body) {
    return await this.post("Taxes", body);
  }

  async putTax(id, body) {
    return await this.put("Taxes", id, body);
  }

  async deleteTax(id) {
    return await this.delete("Taxes", id);
  }
}

export const taxService = new TaxService();
