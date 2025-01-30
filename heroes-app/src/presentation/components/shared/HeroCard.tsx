import { View, Text, Image } from "react-native";
import { globalStyles } from "../../themes/globalStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import OptionsCard from "./OptionsCard";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../navigation/StackGroup";
import { Hero } from "../../../domain/models/heroe";
import { Actions, FavoriteReducer } from "../../reducers/FavoritesReducer";
import { FavoritesContext } from "../../contexts/FavoritesProvider";

type Props = {
  hero: Hero;
};

export function HeroCard({ hero }: Props) {
  const [show, setShow] = useState(false);
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const [state, dispatch] = useReducer(FavoriteReducer, favorites);

  useEffect(() => setFavorites(state), [state]);

  return (
    <Pressable
      onPressIn={() => setShow(true)}
      onPressOut={() => setTimeout(() => setShow(false), 3000)}
    >
      <View style={globalStyles.cardContainer}>
        {show && (
          <OptionsCard
            options={[
              {
                title: "Ver Detalles",
                callback: () => navigate("HERO", hero),
              },
              {
                title: "Añadir a favoritos",
                callback: () =>
                  dispatch({ action: Actions.ADD, payload: hero }),
              },
            ]}
          />
        )}
        <Text style={globalStyles.title}>{hero.title}</Text>
        <Image style={[globalStyles.cardImage]} source={{ uri: hero.image }} />
      </View>
    </Pressable>
  );
}
