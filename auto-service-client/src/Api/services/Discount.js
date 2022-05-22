import { HttpClient } from "../HttpClient";

class DiscountService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllDiscounts() {
    return await this.get("Discounts");
  }

  async getDiscountById(id) {
    return await this.getById("Discounts", id);
  }

  async postDiscount(body) {
    return await this.post("Discounts", body);
  }

  async putDiscount(id, body) {
    return await this.put("Discounts", id, body);
  }

  async deletediscount(id) {
    return await this.delete("Discounts", id);
  }
}

export const discountService = new DiscountService();
