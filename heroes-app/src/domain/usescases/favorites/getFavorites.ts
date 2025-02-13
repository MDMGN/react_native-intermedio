import { Dispatch, SetStateAction } from "react";
import { FavoritesRepository } from "../../../data/respositories/favorites.repository";
import {
  Action,
  Actions,
} from "../../../presentation/reducers/FavoritesReducer";

export default async function getFavorites(
  setError: Dispatch<SetStateAction<boolean>>,
  favoritesDispatch: Dispatch<Action>,
  favoriteRepository: FavoritesRepository
) {
  try {
    const favorites = await favoriteRepository.get("favorites");
    favoritesDispatch({
      type: Actions.ADD_STATE_INITIAL,
      payload: favorites,
    });
    setError(false);
  } catch (e) {
    setError(true);
  }
}
