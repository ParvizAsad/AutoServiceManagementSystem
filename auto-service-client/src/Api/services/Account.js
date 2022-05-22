import { HttpClient } from "../HttpClient";
import axios from "axios";

class AccountService extends HttpClient {
  async register(body) {
    return await axios.post("https://localhost:44330/api/Auth/Register", body);
  }

  async login(body) {
    return await axios.post("https://localhost:44330/api/Auth/Login", body);
  }

  async resetPassword(body) {
    return await axios.post(
      "https://localhost:44330/api/Auth/ResetPassword",
      body
    );
  }

  async logout() {
    return await axios.post("https://localhost:44330/api/Auth/Logout");
  }
}

export const accountService = new AccountService();
