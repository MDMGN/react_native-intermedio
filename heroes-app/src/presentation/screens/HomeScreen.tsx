import { View, FlatList, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { globalStyles } from "../themes/globalStyles";
import apiURL from "../../config/api/superHeroesApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/StackGroup";
import { StackNavigationProp } from "@react-navigation/stack";
import { ajax } from "../../config/herlpers/ajax";
import { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";
import { getMapHero } from "../../domain/mappers/getMapHero";
import { HeroCard } from "../components/shared/HeroCard";

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const [data, setData] = useState([] as HeroResponseAPI[]);
  const lastHeroID = useRef(1);

  const getData = async () => {
    if (lastHeroID.current >= 732) return;
    const newHeroes = Array.from({ length: 5 }, (_) =>
      lastHeroID.current < 732 ? lastHeroID.current++ : null
    ).filter((id) => id !== null);

    const newHeroesResponse = await Promise.all(
      newHeroes.map((heroID) => ajax<HeroResponseAPI>(`${apiURL}/${heroID}`))
    );
    setData((previousValue) => [...previousValue, ...newHeroesResponse]);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={globalStyles.container}>
      <FlatList
        onEndReached={getData}
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
