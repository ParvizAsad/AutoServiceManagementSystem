import axios from "axios";

const config = { headers: { "Content-Type": "application/json" } };
export class HttpClient {
  baseUrl;
  constructor(url) {
    this.baseUrl = url;
  }

  async get(endpoint) {
    return await axios.get(`${this.baseUrl}/${endpoint}`);
  }

  async getById(endpoint, id) {
    return await axios.get(`${this.baseUrl}/${endpoint}/${id}`);
  }

  async post(endpoint, body) {
    return await axios.post(`${this.baseUrl}/${endpoint}`, body);
  }

  async put(endpoint, id, body) {
    return await axios.put(`${this.baseUrl}/${endpoint}/${id}`, body);
  }

  async delete(endpoint, id) {
    return await axios.delete(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
