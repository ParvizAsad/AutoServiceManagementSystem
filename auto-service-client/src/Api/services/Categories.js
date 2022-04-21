import { HttpClient } from "../HttpClient";

class CategoryService extends HttpClient {
    
    constructor(){
        super("");
    }

    getAllCategories(){
      return this.get("Categories");
    }

    getCategoryById(id){
      return this.getById("Categories", id);
    }

    createCategory(body){
      return this.post("Categories", body)
    }

    updateCategory(id,body){
      return this.post("Categories", id, body)
    }
    
    deleteCategory(id){
      return this.delete("Categories", id);
  }
}

export const CategoryService = new CategoryService();