import apiURL from "../../config/api/superHeroesApi";
import { HttpAdapter } from "../../infrastructure/http/http.adapter";
import { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";

export class HeroesRepository {
  constructor(private httpAdapter: HttpAdapter) {}

  public async findById(id: string): Promise<HeroResponseAPI> {
    return await this.httpAdapter.get<HeroResponseAPI>(`${apiURL}/${id}`);
  }
}
