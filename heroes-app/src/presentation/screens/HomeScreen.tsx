import {
  View,
  Button,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { globalStyles } from "../themes/globalStyles";
import apiURL from "../../../config/api/superHeroesApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/StackGroup";
import { StackNavigationProp } from "@react-navigation/stack";
import { ajax } from "../../../helpers";
import { HeroResponseAPI } from "../../infrastructure/interfaces/heroResponseApi";
import { getHeroMap } from "../../domain/mappers/getHeromap";

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const [data, setData] = useState([] as HeroResponseAPI[]);
  const lastHeroID = useRef(1);
  const getData = async () => {
    const newHeroes = Array.from({ length: 5 }, (_) => lastHeroID.current++);
    const newHeroesResponse = await Promise.all(
      newHeroes.map((heroID) => ajax<HeroResponseAPI>(`${apiURL}/${heroID}`))
    );
    setData((previousValue) => [...previousValue, ...newHeroesResponse]);
    console.log(data);
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
          const { title, description, image } = getHeroMap(item);
          return (
            <View>
              <Text>{title}</Text>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: image }}
              />
              <Text>{description}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
