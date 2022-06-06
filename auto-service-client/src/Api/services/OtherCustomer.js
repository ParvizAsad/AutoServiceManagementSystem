import { HttpClient } from "../HttpClient";

class OtherCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllOtherCustomers() {
    return await this.get("OtherCustomerPayment");
  }

  async getOtherCustomerById(id) {
    return await this.getById("OtherCustomerPayment", id);
  }

  async postOtherCustomer(body) {
    return await this.post("OtherCustomerPayment", body);
  }

  async putOtherCustomer(id, body) {
    return await this.put("OtherCustomerPayment", id, body);
  }

  async deleteOtherCustomer(id) {
    return await this.delete("OtherCustomerPayment", id);
  }
}

export const otherCustomerService = new OtherCustomerService();
