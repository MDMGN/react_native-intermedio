import { Dispatch, SetStateAction } from "react";
import { FavoritesRepository } from "../../../data/respositories/favorites.repository";
import { Favorite } from "../../models/favorite";

export function setFavorites(
  favoritesRepository: FavoritesRepository,
  favorites: Favorite[],
  setError: Dispatch<SetStateAction<boolean>>
) {
  try {
    const json = JSON.stringify(favorites);
    favoritesRepository.set("favorites", json);
  } catch (e) {
    setError(true);
  }
}
