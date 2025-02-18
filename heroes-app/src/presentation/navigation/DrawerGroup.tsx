import { createDrawerNavigator } from "@react-navigation/drawer";
import TopTabs from "./TopTabs";
import FavoritesScreen from "../screens/FavoritesScreen";

type DrawerProps = {};

const Drawer = createDrawerNavigator();
export default function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TopTabs} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
}
