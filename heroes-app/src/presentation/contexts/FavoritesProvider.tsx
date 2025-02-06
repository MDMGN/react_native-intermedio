import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from "react";
import { View, Text } from "react-native";
import { Hero } from "../../domain/models/heroe";
import { Action, Actions, FavoriteReducer } from "../reducers/FavoritesReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoriteContext = {
  favorites: Hero[];
  dispatch: Dispatch<Action>;
};

export const FavoritesContext = createContext({} as FavoriteContext);

export default function FavoritesProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(FavoriteReducer, []);

  useEffect(() => {
    const updateFavorites = async () => {
      await AsyncStorage.setItem("favorites", JSON.stringify(state));
    };
    if (state.length) {
      updateFavorites();
    }
  }, [state]);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        dispatch({
          type: Actions.ADD_STATE_INITIAL,
          payload: JSON.parse(favorites),
        });
      }
    };
    getFavorites();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites: state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
}
