import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MarvelScreen from "../screens/MarvelScreen";
import { lazy } from "react";
import { colors } from "../themes/colors";

export type TopTabsProp = {
  ALL: undefined;
  MARVEL: undefined;
};

export default function TopTabs() {
  const Top = createMaterialTopTabNavigator();

  return (
    <Top.Navigator
      screenOptions={{
        lazy: true,
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Top.Screen name="ALL" component={HomeScreen} />
      <Top.Screen name="MARVEL" component={MarvelScreen} />
    </Top.Navigator>
  );
}
