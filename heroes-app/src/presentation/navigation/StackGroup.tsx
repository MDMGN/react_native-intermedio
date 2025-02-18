import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import HeroeScreen from "../screens/HeroeScreen";
import { Hero } from "../../domain/models/heroe";
import { Easing, useAnimatedValue } from "react-native";
import DrawerGroup from "./DrawerGroup";

export type StackProps = {
  HOME: undefined;
  HERO: Hero;
};

const Stack = createStackNavigator<StackProps>();

export default function StackGroup() {
  return (
    <Stack.Navigator
      screenOptions={{
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 300,
              easing: Easing.bounce,
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 300,
              easing: Easing.ease,
            },
          },
        },
        cardStyleInterpolator: ({ layouts, current, next }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen
        name="HOME"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HERO" component={HeroeScreen} />
    </Stack.Navigator>
  );
}
