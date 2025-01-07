import { View, Text } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { StackProps } from "../navigation/StackGroup";

export default function HeroeScreen() {
  const { params, key, path } = useRoute<RouteProp<StackProps, "HERO">>();
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      title: params.title,
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text>HeroScreen</Text>
    </View>
  );
}
