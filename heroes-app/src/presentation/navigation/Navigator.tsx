import { NavigationContainer } from "@react-navigation/native";
import DrawerGroup from "./DrawerGroup";
import StackGroup from "./StackGroup";
export default function Navigator() {
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
}
