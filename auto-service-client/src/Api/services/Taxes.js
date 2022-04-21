import { HttpClient } from "../HttpClient";

class TaxService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllTaxes(){
      return this.get("Taxes");
    }

    getTaxById(id){
      return this.getById("Taxes", id);
    }

    createTax(body){
      return this.post("Taxes", body)
    }

    updateTax(id,body){
      return this.post("Taxes", id, body)
    }
    
    deleteTax(id){
      return this.delete("Taxes", id);
  }
}

export const TaxService = new TaxService();