import { HttpClient } from "../HttpClient";

class UserService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api/Auth");
  }

  async getAllRole() {
    return await this.get("GetAllRole");
  }

  async getAllUsers() {
    return await this.get("GetAllUser");
  }

  async GetAllUserRole() {
    return await this.get("GetAllUserRole");
  }

  async getUserById(id) {
    return await this.getById("Users", id);
  }

  async postUser(body) {
    return await this.post("Register", body);
  }

  async loginUser(body) {
    return await this.post("Login", body);
  }
  
  async putUser(id, body) {
    return await this.put("Users", id, body);
  }

  async deleteUser(id) {
    return await this.delete("BlockUser", id);
  }
}

export const userService = new UserService();
