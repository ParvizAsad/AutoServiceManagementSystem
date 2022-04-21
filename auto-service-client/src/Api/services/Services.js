import { HttpClient } from "../HttpClient";

class ServiceService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllServices(){
      return this.get("Services");
    }

    getServiceById(id){
      return this.getById("Services", id);
    }

    createService(body){
      return this.post("Services", body)
    }

    updateService(id,body){
      return this.post("Services", id, body)
    }
    
    deleteService(id){
      return this.delete("Services", id);
  }
}

export const ServiceService = new ServiceService();