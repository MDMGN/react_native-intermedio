import { HeroesRepository } from "../../../data/respositories/heroes.repository";
import { HeroResponseAPI } from "../../../infrastructure/interfaces/heroResponseApi";

export async function getMoreHeroes(
  lastHeroID: React.MutableRefObject<number>,
  heroesRepository: HeroesRepository
): Promise<HeroResponseAPI[]> {
  if (lastHeroID.current >= 732) return [];
  const newHeroes = Array.from({ length: 5 }, (_) =>
    lastHeroID.current < 732 ? lastHeroID.current++ : null
  ).filter((id) => id !== null);

  const newHeroesResponse = await Promise.all(
    newHeroes.map((heroID) => heroesRepository.findById(`${heroID}`))
  );
  return newHeroesResponse;
}
