import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HeroesScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchScreen from "../screens/SearchScreen";
import TopTabs from "./TopTabs";
import DrawerGroup from "./DrawerGroup";

type BottomProps = {
  Home: undefined;
  SEARCH: undefined;
};

const BottomTab = createBottomTabNavigator<BottomProps>();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={DrawerGroup}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{
          title: "Search",
          headerTitle: "",
          tabBarIcon: ({}) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
