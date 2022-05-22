import { HttpClient } from "../HttpClient";

class UserService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllUsers() {
    return await this.get("Users");
  }

  async getUserById(id) {
    return await this.getById("Users", id);
  }

  async postUser(body) {
    return await this.post("Users", body);
  }

  async putUser(id, body) {
    return await this.put("Users", id, body);
  }

  async deleteUser(id) {
    return await this.delete("Users", id);
  }
}

export const userService = new UserService();
