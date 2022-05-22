import { HttpClient } from "../HttpClient";

class StatistcsService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getAllStatistics() {
    return await this.get("Statistics");
  }
}

export const statistcsService = new StatistcsService();
