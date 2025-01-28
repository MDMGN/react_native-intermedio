import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeroesScreen from "../screens/HeroesScreen";
import MarvelScreen from "../screens/MarvelScreen";
import { lazy } from "react";
import { colors } from "../themes/colors";

export type TopTabsProp = {
  ALL: undefined;
  MARVEL: undefined;
  DC: undefined;
};

export default function TopTabs() {
  const Top = createMaterialTopTabNavigator<TopTabsProp>();

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
      <Top.Screen name="ALL" component={HeroesScreen} />
      <Top.Screen name="MARVEL" component={HeroesScreen} />
      <Top.Screen name="DC" component={HeroesScreen} />
    </Top.Navigator>
  );
}
