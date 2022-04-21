import { HttpClient } from "../HttpClient";

class BrandService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllBrands(){
      return this.get("Brands");
    }

    getBrandById(id){
      return this.getById("Brands", id);
    }

    createBrand(body){
      return this.post("Brands", body)
    }
    
    deleteBrand(id){
      return this.delete("Brands", id);
  }
}

export const BrandService = new BrandService();