import { HttpClient } from "../HttpClient";

class ProductService extends HttpClient{

constructor(){
    super("https://localhost:44330/api");

}

async getAllEmployee(){
    return await this.get("Employees");
};

async getProductByID(id){
    return await this.getProductByID("Employees");
};

async postProduct(product){
  return await this.post("Employees", product).then(response => { 
    console.log(response)
  })
};

async deleteProduct(id){
  return await this.delete(`Product/${id}`);
};

}

export const productService = new ProductService()

