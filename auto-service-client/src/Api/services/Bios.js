import { HttpClient } from "../HttpClient";

class BioService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }

  async getBio() {
    return await this.get("Bios");
  }
}

export const bioService = new BioService();
