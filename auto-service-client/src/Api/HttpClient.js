import axios from "axios";

export class HttpClient{
    baseUrl;

    constructor(url){
        this.baseUrl=url;
    }

    async get(endpoint){
      return await axios.get(`${this.baseUrl}/${endpoint}`);
    }

    async getById(endpoint, id){
        return await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
    }

    async post(endpoint, body){
        return await axios.post(`${this.baseUrl}/${endpoint}`, body);
    }
}