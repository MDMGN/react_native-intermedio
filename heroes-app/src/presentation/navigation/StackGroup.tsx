import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import HeroeScreen from "../screens/HeroeScreen";
import { Hero } from "../../domain/models/heroe";

export type StackProps = {
  HOME: undefined;
  HERO: Hero;
};

const Stack = createStackNavigator<StackProps>();

export default function StackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HOME"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="HERO" component={HeroeScreen} />
    </Stack.Navigator>
  );
}
