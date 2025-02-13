import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

type DrawerProps = {};

const Drawer = createDrawerNavigator();
export default function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Drawer"
        options={{ title: "Inicio" }}
        component={BottomTabs}
      />
    </Drawer.Navigator>
  );
}
