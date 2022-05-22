import { HttpClient } from "../HttpClient";

class CategoryService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllCategories() {
    return await this.get("Categories");
  }

  async getCategoryById(id) {
    return await this.getById("Categories", id);
  }

  async postCategory(body) {
    return await this.post("Categories", body);
  }

  async putCategory(id, body) {
    return await this.put("Categories", id, body);
  }

  async deleteCategory(id) {
    return await this.delete("Categories", id);
  }
}

export const categoryService = new CategoryService();
