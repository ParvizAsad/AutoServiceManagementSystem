import { HttpClient } from "../HttpClient";

class CustomerService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllCustomers(){
      return this.get("Customers");
    }

    getCustomerById(id){
      return this.getById("Customers", id);
    }

    createCustomer(body){
      return this.post("Customers", body)
    }

    updateCustomer(id,body){
      return this.post("Customers", id, body)
    }
    
    deleteCustomer(id){
      return this.delete("Customers", id);
  }
}

export const CustomerService = new CustomerService();