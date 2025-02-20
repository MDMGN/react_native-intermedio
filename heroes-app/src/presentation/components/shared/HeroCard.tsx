import { View, Text, Image } from "react-native";
import { globalStyles } from "../../themes/globalStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import OptionsCard from "./OptionsCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../navigation/StackGroup";
import { Hero } from "../../../domain/models/heroe";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../contexts/FavoritesProvider";
import { Actions } from "../../reducers/FavoritesReducer";

type Props = {
  hero: Hero;
  handleAddFavorites: (hero: Hero) => void;
};

export function HeroCard({ hero, handleAddFavorites }: Props) {
  const [show, setShow] = useState(false);
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const [visible, setVisible] = useState(false);
  const { favorites, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const visible = favorites.some((favorite) => favorite.id === hero.id);
    setVisible(visible);
  }, [favorites]);

  return (
    <View style={globalStyles.cardContainer}>
      {visible && <FontAwesome5 name="heart" size={24} color="black" />}
      {show && (
        <OptionsCard
          options={
            !visible
              ? [
                  {
                    title: "Ver Detalles",
                    callback: () => navigate("HERO", hero),
                  },
                  {
                    title: "Añadir a favoritos",
                    callback: () => handleAddFavorites(hero),
                  },
                ]
              : [
                  {
                    title: "Eliminar de favoritos",
                    callback: () =>
                      dispatch({
                        payload: hero,
                        type: Actions.DELETE_FAVORITES,
                      }),
                  },
                ]
          }
        />
      )}
      <Pressable
        onPressIn={() => setShow(true)}
        onPressOut={() => setTimeout(() => setShow(false), 3000)}
      >
        <Text style={globalStyles.title}>{hero.title}</Text>
        <Image style={[globalStyles.cardImage]} source={{ uri: hero.image }} />
      </Pressable>
    </View>
  );
}
