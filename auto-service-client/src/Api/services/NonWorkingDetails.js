import { HttpClient } from "../HttpClient";

class NonWorkingDetailService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }
  async getAllNonWorkingDetails() {
    return await this.get("NonWorkingDetails");
  }

  async getNonWorkingDetailById(id) {
    return await this.getById("NonWorkingDetails", id);
  }

  async postNonWorkingDetail(NonWorkingDetail) {
    return await this.post("NonWorkingDetails", NonWorkingDetail);
  }

  async putNonWorkingDetail(id, body) {
    return await this.put("NonWorkingDetails", id, body);
  }

  async deleteNonWorkingDetail(id) {
    return await this.delete("NonWorkingDetails", id);
  }
}

export const nonWorkingDetailService = new NonWorkingDetailService();
