import { HttpClient } from "../HttpClient";

class AddServiceCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllAddServiceCustomeres() {
    return await this.get("AddServiceCustomers");
  }

  async getAddServiceCustomerById(id) {
    return await this.getById("AddServiceCustomers", id);
  }

  async postAddServiceCustomer(body) {
    return await this.post("AddServiceCustomers", body);
  }

  async putAddServiceCustomer(id, body) {
    return await this.put("AddServiceCustomers", id, body);
  }

  async deleteAddServiceCustomer(id) {
    return await this.delete("AddServiceCustomers", id);
  }
}

export const addServiceCustomerService = new AddServiceCustomerService();
