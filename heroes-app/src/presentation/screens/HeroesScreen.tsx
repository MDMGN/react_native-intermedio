import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { getMapHero } from "../../domain/mappers/getMapHero";
import { HeroCard } from "../components/shared/HeroCard";
import useHeroes from "../hooks/home/useHeroes";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TopTabsProp } from "../navigation/TopTabs";
import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesProvider";

export default function HeroesScreen({
  route,
}: MaterialTopTabScreenProps<TopTabsProp>) {
  const { data, loadMore } = useHeroes(route.name);
  const { favorites } = useContext(FavoritesContext);
  return (
    <View style={globalStyles.container}>
      <Text>{JSON.stringify(favorites)}</Text>
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
          return <HeroCard hero={hero} />;
        }}
      />
    </View>
  );
}
