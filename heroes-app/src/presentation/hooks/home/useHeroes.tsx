import { useEffect, useRef, useState } from "react";
import { HeroResponseAPI } from "../../../infrastructure/interfaces/heroResponseApi";
import { getMoreHeroes } from "../../../domain/usescases/heroes/getMoreHeroes";
import { AxiosHttpAdapter } from "../../../infrastructure/http/axios.http.adapter";
import { HeroesRepository } from "../../../data/respositories/heroes.repository";
import { getMoreHeroesByPublisher } from "../../../domain/usescases/heroes/getMoreHeroesByPublisher";

const FILTER_SCREEN = {
  ALL: null,
  MARVEL: "Marvel Comics",
  DC: "DC Comics",
};
export default function useHeroes(publisher: keyof typeof FILTER_SCREEN) {
  const [data, setData] = useState([] as HeroResponseAPI[]);
  const lastHeroID = useRef(1);
  const httpAdapter = new AxiosHttpAdapter();
  const heroesRepository = new HeroesRepository(httpAdapter);

  const loadMore = async () => {
    let newHeroes;
    if (FILTER_SCREEN[publisher]) {
      newHeroes = await getMoreHeroesByPublisher(
        FILTER_SCREEN[publisher],
        heroesRepository,
        lastHeroID
      );
    } else {
      newHeroes = await getMoreHeroes(lastHeroID, heroesRepository);
    }
    setData((prevValue) => [...prevValue, ...newHeroes]);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    console.log(data.map((hero) => hero.id));
  }, [data]);
  return {
    data,
    loadMore,
  };
}
