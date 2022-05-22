import { HttpClient } from "../HttpClient";

class ServiceService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllServices() {
    return await this.get("Services");
  }

  async getServiceById(id) {
    return await this.getById("Services", id);
  }

  async postService(body) {
    return await this.post("Services", body);
  }

  async putService(id, body) {
    return await this.put("Services", id, body);
  }

  async deleteService(id) {
    return await this.delete("Services", id);
  }
}

export const serviceService = new ServiceService();
