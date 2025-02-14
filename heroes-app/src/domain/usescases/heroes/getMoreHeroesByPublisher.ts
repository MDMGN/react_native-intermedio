import { HeroesRepository } from "../../../data/respositories/heroes.repository";
import { HeroResponseAPI } from "../../../infrastructure/interfaces/heroResponseApi";

export async function getMoreHeroesByPublisher(
  publisher: string,
  heroesRepository: HeroesRepository,
  lastHeroId: React.MutableRefObject<number>
) {
  let newHeroesByPublisher: HeroResponseAPI[] = [];

  while (newHeroesByPublisher.length < 5 && lastHeroId.current < 732) {
    try {
      const newHeroe = await heroesRepository.findById(
        `${lastHeroId.current++}`
      );
      if (newHeroe?.biography?.publisher === publisher) {
        newHeroesByPublisher.push(newHeroe);
        console.log({ newHeroe });
      }
    } catch (e) {
      lastHeroId.current++;
    }
  }
  return newHeroesByPublisher;
}
