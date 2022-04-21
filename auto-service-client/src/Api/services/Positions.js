import { HttpClient } from "../HttpClient";

class PositionService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllPositions(){
      return this.get("Positions");
    }

    getPositionById(id){
      return this.getById("Positions", id);
    }

    createPosition(body){
      return this.post("Positions", body)
    }

    updatePosition(id,body){
      return this.post("Positions", id, body)
    }
    
    deletePosition(id){
      return this.delete("Positions", id);
  }
}

export const PositionService = new PositionService();