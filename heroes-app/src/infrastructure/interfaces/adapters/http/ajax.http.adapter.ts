import { ajax } from "../../../../config/helpers/ajax";
import { HttpAdapter } from "./http.adapter";

export class AjaxHttpAdapter implements HttpAdapter {
  async get<T>(url: string, options: Record<string, unknown>): Promise<T> {
    try {
      const resp = await ajax<T>(url, options);
      return resp;
    } catch (err) {
      throw new Error("error...");
    }
  }
}
