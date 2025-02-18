import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import StackGroup from "./StackGroup";
import TopTabs from "./TopTabs";

type DrawerProps = {};

const Drawer = createDrawerNavigator();
export default function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TopTabs} />
    </Drawer.Navigator>
  );
}
