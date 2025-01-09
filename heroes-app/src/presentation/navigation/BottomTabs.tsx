import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import SearchScreen from "../screens/SearchScreen";
import { useState } from "react";

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({}) => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="SEARCH"
        component={SearchScreen}
        options={{
          tabBarIcon: ({}) => (
            <AntDesign name="search1" size={24} color="black" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
