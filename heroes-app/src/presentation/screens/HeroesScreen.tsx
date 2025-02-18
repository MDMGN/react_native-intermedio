import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { getMapHero } from "../../domain/mappers/getMapHero";
import { HeroCard } from "../components/shared/HeroCard";
import useHeroes from "../hooks/home/useHeroes";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TopTabsProp } from "../navigation/TopTabs";
import { useContext } from "react";
import { Actions } from "../reducers/FavoritesReducer";
import { Hero } from "../../domain/models/heroe";
import { FavoritesContext } from "../contexts/FavoritesProvider";

export default function HeroesScreen({
  route,
}: MaterialTopTabScreenProps<TopTabsProp>) {
  const { data, loadMore } = useHeroes(route.name);
  const { favorites, dispatch } = useContext(FavoritesContext);

  const handleAddFavorites = (hero: Hero) => {
    dispatch({
      payload: hero,
      type: Actions.ADD_FAVORITES,
    });
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd > 0) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => <ActivityIndicator size={"large"} />}
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const hero = getMapHero(item);
          const visible = favorites.some((favorite) => favorite.id === hero.id);
          return (
            <HeroCard
              hero={hero}
              handleAddFavorites={handleAddFavorites}
              visible={visible}
            />
          );
        }}
      />
    </View>
  );
}
