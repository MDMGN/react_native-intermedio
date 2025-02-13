import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Hero } from "../../domain/models/heroe";
import { Action, Actions, FavoriteReducer } from "../reducers/FavoritesReducer";
import { setFavorites } from "../../domain/usescases/favorites/setFavorites";
import getFavorites from "../../domain/usescases/favorites/getFavorites";
import { FavoritesRepository } from "../../data/respositories/favorites.repository";
import { AsyncStorageAdapter } from "../../infrastructure/storage/asyncstorage.storage.adapter";

type FavoriteContext = {
  favorites: Hero[];
  error: boolean;
  dispatch: Dispatch<Action>;
};

export const FavoritesContext = createContext({} as FavoriteContext);

export default function FavoritesProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(FavoriteReducer, []);
  const [error, setError] = useState(false);
  const storageAdapter = new AsyncStorageAdapter();
  const favoritesRepository = new FavoritesRepository(storageAdapter);

  useEffect(() => {
    if (state.length) {
      setFavorites(favoritesRepository, state, setError);
    }
  }, [state]);

  useEffect(() => {
    getFavorites(setError, dispatch, favoritesRepository);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites: state, error, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}
