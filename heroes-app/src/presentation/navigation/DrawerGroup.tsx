import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

type DrawerProps = {
  BottomTabs: undefined;
};

const Drawer = createDrawerNavigator<DrawerProps>();
export default function DrawerGroup() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
