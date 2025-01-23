import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";
import apiURL from "../../config/api/superHeroesApi";

export class AxiosHttpAdapter implements HttpAdapter {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({ baseURL: apiURL });
  }
  async get<T>(url: string, options: Record<string, unknown>): Promise<T> {
    try {
      const resp = await this.axiosInstance.get<T>(url, options);
      return resp.data;
    } catch (err) {
      throw new Error("Error ...");
    }
  }
}
