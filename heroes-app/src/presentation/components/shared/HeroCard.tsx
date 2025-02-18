import { View, Text, Image } from "react-native";
import { globalStyles } from "../../themes/globalStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import OptionsCard from "./OptionsCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../navigation/StackGroup";
import { Hero } from "../../../domain/models/heroe";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

type Props = {
  hero: Hero;
  handleAddFavorites: (hero: Hero) => void;
  visible: boolean;
};

export function HeroCard({ hero, handleAddFavorites, visible }: Props) {
  const [show, setShow] = useState(false);
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();

  return (
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
              callback: () => handleAddFavorites(hero),
            },
          ]}
        />
      )}
      <Pressable
        onPressIn={() => setShow(true)}
        onPressOut={() => setTimeout(() => setShow(false), 3000)}
      >
        {visible && <FontAwesome5 name="heart" size={24} color="black" />}
        <Text style={globalStyles.title}>{hero.title}</Text>
        <Image style={[globalStyles.cardImage]} source={{ uri: hero.image }} />
      </Pressable>
    </View>
  );
}
