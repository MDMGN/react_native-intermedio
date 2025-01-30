import { StyleSheet } from "react-native";

import Navigator from "./src/presentation/navigation/Navigator";
import FavoritesProvider from "./src/presentation/contexts/FavoritesProvider";

export default function App() {
  return (
    <FavoritesProvider>
      <Navigator />
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
