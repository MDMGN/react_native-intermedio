import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HeroesScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchScreen from "../screens/SearchScreen";
import TopTabs from "./TopTabs";

type BottomProps = {
  HOME: undefined;
  SEARCH: undefined;
};

const BottomTab = createBottomTabNavigator<BottomProps>();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="HOME"
        component={TopTabs}
        options={{
          tabBarIcon: ({}) => <AntDesign name="home" size={24} color="black" />,
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{
          title: "",
          tabBarIcon: ({}) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
