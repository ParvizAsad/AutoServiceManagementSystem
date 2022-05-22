import { HttpClient } from "../HttpClient";

class NonWorkingTypeService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }
  async getAllNonWorkingTypes() {
    return await this.get("NonWorkingTypes");
  }

  async getNonWorkingTypeById(id) {
    return await this.getById("NonWorkingTypes", id);
  }

  async postNonWorkingType(NonWorkingType) {
    return await this.post("NonWorkingTypes", NonWorkingType);
  }

  async putNonWorkingType(id, body) {
    return await this.put("NonWorkingTypes", id, body);
  }

  async deleteNonWorkingType(id) {
    return await this.delete("NonWorkingTypes", id);
  }
}

export const nonWorkingTypeService = new NonWorkingTypeService();
