import { HttpClient } from "../HttpClient";

class ProductService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllProducts(){
      return this.get("Products");
    }

    getProductById(id){
      return this.getById("Products", id);
    }

    createProduct(body){
      return this.post("Products", body)
    }

    updateProduct(id,body){
      return this.post("Products", id, body)
    }
    
    deleteProduct(id){
      return this.delete("Products", id);
  }
}

export const ProductService = new ProductService();