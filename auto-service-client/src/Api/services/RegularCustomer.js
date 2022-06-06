import { HttpClient } from "../HttpClient";

class RegularCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllRegularCustomers() {
    return await this.get("RegularCustomerPayment");
  }

  async getRegularCustomerById(id) {
    return await this.getById("RegularCustomerPayment", id);
  }

  async postRegularCustomer(body) {
    return await this.post("RegularCustomerPayment", body);
  }

  async putRegularCustomer(id, body) {
    return await this.put("RegularCustomerPayment", id, body);
  }

  async deleteRegularCustomer(id) {
    return await this.delete("RegularCustomerPayment", id);
  }
}

export const regularCustomerService = new RegularCustomerService();
