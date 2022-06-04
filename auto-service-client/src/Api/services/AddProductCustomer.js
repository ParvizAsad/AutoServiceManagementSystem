import { HttpClient } from "../HttpClient";

class AddProductCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllAddProductCustomeres() {
    return await this.get("AddProductCustomers");
  }

  async getAddProductCustomerById(id) {
    return await this.getById("AddProductCustomers", id);
  }

  async postAddProductCustomer(body) {
    return await this.post("AddProductCustomers", body);
  }

  async putAddProductCustomer(id, body) {
    return await this.put("AddProductCustomers", id, body);
  }

  async deleteAddProductCustomer(id) {
    return await this.delete("AddProductCustomers", id);
  }
}

export const addProductCustomerService = new AddProductCustomerService();
