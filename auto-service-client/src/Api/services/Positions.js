import { HttpClient } from "../HttpClient";

class PositionService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }
  async getAllPositions() {
    return await this.get("Positions");
  }

  async getPositionById(id) {
    return await this.getById(`Positions/${id}`);
  }

  async postPosition(employee) {
    return await this.post("Positions", employee).then((response) => {
      console.log(response);
    });
  }

  async deletePosition(id) {
    return await this.delete(`Positions/${id}`);
  }
}

export const positionService = new PositionService();
