import { useEffect, useState } from "react";
import { createContext } from "react";
import { Hero } from "../../domain/models/heroe";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Favorite = {
  favorites: Hero[];
  setFavorites: React.Dispatch<React.SetStateAction<Hero[]>>;
};

export const FavoritesContext = createContext({} as Favorite);

export default function FavoritesProvider({
  children,
}: React.PropsWithChildren) {
  const [favorites, setFavorites] = useState([] as Hero[]);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setFavorites(JSON.parse(favorites));
      }
    };
    getFavorites();
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
