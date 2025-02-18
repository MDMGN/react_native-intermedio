import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchScreen from "../screens/SearchScreen";
import DrawerGroup from "./DrawerGroup";

type BottomProps = {
  DrawerGroup: undefined;
  SEARCH: undefined;
};

const BottomTab = createBottomTabNavigator<BottomProps>();

export default function BottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="DrawerGroup"
        component={DrawerGroup}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
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
