import { View, Text } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { FlatList } from "react-native-gesture-handler";
import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesProvider";
import FavoriteCard from "../components/favorites/FavoriteCard";

export default function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={favorites}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <FavoriteCard hero={item} />}
      />
    </View>
  );
}
