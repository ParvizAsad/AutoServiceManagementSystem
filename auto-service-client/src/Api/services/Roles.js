import { HttpClient } from "../HttpClient";

class RoleService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllRoles() {
    return await this.get("Roles");
  }

  async getRoleById(id) {
    return await this.getById("Roles", id);
  }

  async postRole(body) {
    return await this.post("Roles", body);
  }

  async putRole(id, body) {
    return await this.put("Roles", id, body);
  }

  async deleteRole(id) {
    return await this.delete("Roles", id);
  }
}

export const roleService = new RoleService();
