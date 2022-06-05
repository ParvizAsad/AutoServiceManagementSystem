import { HttpClient } from "../HttpClient";

class AddProductCustomerService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllAddProductCustomeres() {
    return await this.get("CustomersProduct");
  }

  async getAddProductCustomerById(id) {
    return await this.getById("CustomersProduct", id);
  }

  async postAddProductCustomer(body) {
    return await this.post("CustomersProduct", body);
  }

  async putAddProductCustomer(id, body) {
    return await this.put("CustomersProduct", id, body);
  }

  async deleteAddProductCustomer(id) {
    return await this.delete("CustomersProduct", id);
  }
}

export const addProductCustomerService = new AddProductCustomerService();
