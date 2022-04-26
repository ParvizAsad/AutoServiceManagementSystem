import { HttpClient } from "../HttpClient";

class PositionService extends HttpClient {
  constructor() {
    super("https://localhost:44330/api");
  }
  async getAllPositions() {
    return await this.get("Positions");
  }

  async getPositionById(id) {
    return await this.getProductByID("Positions", id);
  }

  async postPosition(position) {
    return await this.post("Positions", position).then((response) => {
      console.log(response);
    });
  }

  // async updatePosition(id,body){
  //   return await this.post("Positions", id, body)
  // }

  async deletePosition(id) {
    return await this.delete(`Positions/${id}`);
  }
}

export const positionService = new PositionService();
