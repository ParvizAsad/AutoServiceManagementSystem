import { HttpClient } from "../HttpClient";

class CustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllCustomers() {
    return await this.get("Customers");
  }

  async getCustomerById(id) {
    return await this.getById("Customers", id);
  }

  async postCustomer(body) {
    return await this.post("Customers", body);
  }

  async putCustomer(id, body) {
    return await this.put("Customers", id, body);
  }

  async deleteCustomer(id) {
    return await this.delete("Customers", id);
  }
}

export const customerService = new CustomerService();
