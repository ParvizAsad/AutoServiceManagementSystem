import { HttpClient } from "../HttpClient";

class ProductService extends HttpClient {
    
    constructor(){
        super("https://localhost:44330/api");
    }

    async getAllProducts(){
      return await this.get("Products");
    }

    async getProductById(id){
      return await this.getById("Products", id);
    }

    async postProduct(body){
      return await this.post("Products", body)
    }

    async updateProduct(id,body){
      return await this.post("Products", id, body)
    }
    
    async deleteProduct(id){
      return await this.delete("Products", id);
  }
}

export const productService = new ProductService();