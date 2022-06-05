import { HttpClient } from "../HttpClient";

class AddServiceCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllAddServiceCustomeres() {
    return await this.get("CustomersAddService");
  }

  async getAddServiceCustomerById(id) {
    return await this.getById("CustomersAddService", id);
  }

  async postAddServiceCustomer(body) {
    return await this.post("CustomersAddService", body);
  }

  async putAddServiceCustomer(id, body) {
    return await this.put("CustomersAddService", id, body);
  }

  async deleteAddServiceCustomer(id) {
    return await this.delete("CustomersAddService", id);
  }
}

export const addServiceCustomerService = new AddServiceCustomerService();
