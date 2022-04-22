import { HttpClient } from "../HttpClient";

class ProductService extends HttpClient{

constructor(){
    super("https://localhost:44330/api");

}

async getAllEmployee(){
    return await this.get("Product");
};

async getProductByID(id){
    return await this.getProductByID("Product");
};

async postProduct(product){
  return await this.post("Product/Create", product).then(response => { 
    console.log(response)
  })
};

async deleteProduct(id){
  return await this.delete(`Product/${id}`);
};

}

export const productService = new ProductService()

