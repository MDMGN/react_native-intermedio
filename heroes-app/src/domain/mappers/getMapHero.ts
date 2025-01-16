import type { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";
import type { Hero } from "../models/heroe";

export const getMapHero = (data: HeroResponseAPI): Hero => {
  return {
    title: data.name,
    image: data.image.url,
    description: `
              Eye Color :  ${data.appearance["eye-color"]} \n
              Height: ${data.appearance.height} \n
              Publisher: ${data.biography.publisher} \n
              Place of Birth: ${data.biography["place-of-birth"]} \n
              First Appearance: ${data.biography["first-appearance"]} \n
              Ocupation: ${data.work.occupation} \n
              ${data.connections["group-affiliation"]}
              ${data.connections.relatives}
              
         `,
  };
};
