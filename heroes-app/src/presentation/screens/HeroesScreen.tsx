import { View, FlatList, ActivityIndicator, Pressable } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/StackGroup";
import { StackNavigationProp } from "@react-navigation/stack";
import { getMapHero } from "../../domain/mappers/getMapHero";
import { HeroCard } from "../components/shared/HeroCard";
import useHeroes from "../hooks/home/useHeroes";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { TopTabsProp } from "../navigation/TopTabs";

export default function HeroesScreen({
  route,
}: MaterialTopTabScreenProps<TopTabsProp>) {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const { data, loadMore } = useHeroes(route.name);

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
          return (
            <Pressable onPress={() => navigate("HERO", hero)}>
              <HeroCard image={hero.image} title={hero.title} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}
