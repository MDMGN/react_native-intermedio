import { useEffect, useRef, useState } from "react";
import { HeroResponseAPI } from "../../../infrastructure/interfaces/heroResponseApi";
import { getMoreHeroes } from "../../../domain/usescases/heroes/getMoreHeroes";
import { AxiosHttpAdapter } from "../../../infrastructure/http/axios.http.adapter";
import { HeroesRepository } from "../../../data/respositories/heroes.repository";

export default function useHeroes() {
  const [data, setData] = useState([] as HeroResponseAPI[]);
  const lastHeroID = useRef(1);
  const httpAdapter = new AxiosHttpAdapter();
  const heroesRepository = new HeroesRepository(httpAdapter);

  const loadMore = async () => {
    const newHeroes = await getMoreHeroes(lastHeroID, heroesRepository);
    setData((prevValue) => [...prevValue, ...newHeroes]);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return {
    data,
    loadMore,
  };
}
