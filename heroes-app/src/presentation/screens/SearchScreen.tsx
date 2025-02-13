import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import SearchInput from "../components/search/SearchInput";
import { ajax } from "../../config/helpers/ajax";
import apiURL from "../../config/api/superHeroesApi";
import type {
  SearchHeroResponseApi,
  SearchItemResult,
} from "../../infrastructure/interfaces/heroResponseApi";
import SearchItem from "../components/search/SearchItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../navigation/StackGroup";
import { getMapHero } from "../../domain/mappers/getMapHero";

export default function SearchScreen() {
  const { setOptions, navigate } =
    useNavigation<StackNavigationProp<StackProps>>();

  const [error, setError] = useState(false);
  const [data, setData] = useState([] as SearchItemResult[]);

  const onChange = async (query: string) => {
    setError(false);
    try {
      const resp = await ajax<SearchHeroResponseApi>(
        `${apiURL}/search/${query}`
      );
      setData(resp);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <SearchInput onChange={onChange} />,
    });
  }, []);
  return (
    <View>
      {error ? (
        <Text>No hay resultados</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => {
            const hero = getMapHero(item);
            return (
              <Pressable onPress={() => navigate("HERO", hero)}>
                <SearchItem
                  image={hero.image}
                  name={hero.title}
                  aliases={item.biography.aliases}
                />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}
