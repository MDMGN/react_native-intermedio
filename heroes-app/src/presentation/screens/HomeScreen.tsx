import { View, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { globalStyles } from "../themes/globalStyles";
import apiURL from "../../../config/api/superHeroesApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/StackGroup";
import { StackNavigationProp } from "@react-navigation/stack";

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const [data, setData] = useState([] as any);
  useEffect(() => {
    const getData = async () => {
      const data = await Promise.all([
        fetch(`${apiURL}/1`).then((resp) => resp.json()),
        fetch(`${apiURL}/2`).then((resp) => resp.json()),
        fetch(`${apiURL}/3`).then((resp) => resp.json()),
      ]);
      setData(data);
    };
    getData();
    console.log(data);
  }, []);
  return (
    <View style={globalStyles.container}>
      <Button
        title="Button 1"
        onPress={() => navigate("HERO", { id: 1, title: "title 1" })}
      />
      <Button
        title="Button 2"
        onPress={() => navigate("HERO", { id: 2, title: "title 2" })}
      />
      <Button
        title="Button 3"
        onPress={() => navigate("HERO", { id: 3, title: "title 3" })}
      />
    </View>
  );
}
