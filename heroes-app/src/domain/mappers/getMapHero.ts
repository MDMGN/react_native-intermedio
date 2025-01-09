import type { Hero } from "../../data/models/heroe";
import type { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";

export const getMapHero = (data: HeroResponseAPI): Hero => {
  return {
    title: data.name,
    image: data.image.url,
    description: `
              Eye Color :  ${data.appearance["eye-color"]} \n
              Height: ${data.appearance.height}
         `,
  };
};
