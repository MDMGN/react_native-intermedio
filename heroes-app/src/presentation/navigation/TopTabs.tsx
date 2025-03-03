import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeroesScreen from "../screens/HeroesScreen";
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
        tabBarScrollEnabled: true,
        animationEnabled: false,
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
