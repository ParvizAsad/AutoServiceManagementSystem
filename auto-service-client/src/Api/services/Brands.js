import { HttpClient } from "../HttpClient";

class BrandService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllBrands() {
    return await this.get("Brands");
  }

  async getBrandById(id) {
    return await this.getById("Brands", id);
  }

  async postBrand(body) {
    return await this.post("Brands", body);
  }

  async putBrand(id, body) {
    return await this.put("Brands", id, body);
  }

  async deleteBrand(id) {
    return await this.delete("Brands", id);
  }
}

export const brandService = new BrandService();
