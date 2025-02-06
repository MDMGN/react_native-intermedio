import type {
  HeroResponseAPI,
  SearchItemResult,
} from "../../infrastructure/interfaces/heroResponseApi";
import type { Hero } from "../models/heroe";

export const getMapHero = (data: HeroResponseAPI | SearchItemResult): Hero => {
  return {
    id: data?.id,
    title: data.name,
    image: data.images?.sm,
    description: `
              Eye Color :  ${
                (data.appearance && data.appearance["eye-color"]) || "n/a"
              } \n
              Height: ${data.appearance?.height ?? "n/a"} \n
              Publisher: ${data.biography?.publisher ?? "n/a"} \n
              Place of Birth: ${
                (data.biography && data.biography["place-of-birth"]) || "n/a"
              } \n
              First Appearance: ${
                (data.biography && data.biography["first-appearance"]) || "n/a"
              } \n
              Ocupation: ${(data.work && data.work.occupation) || "n/a"} \n
              ${
                (data.connections && data.connections["group-affiliation"]) ||
                "n/a"
              }
              ${data.connections?.relatives ?? "n/a"}
              
         `,
  };
};
