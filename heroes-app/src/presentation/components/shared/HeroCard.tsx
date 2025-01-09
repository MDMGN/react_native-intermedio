import { View, Text, Image } from "react-native";
import { Hero } from "../../../domain/models/heroe";
import { globalStyles } from "../../themes/globalStyles";

type Props = {
  title: string;
  image: string;
};

export function HeroCard({ title, image }: Props) {
  return (
    <View style={globalStyles.cardContainer}>
      <Text style={globalStyles.cardTitle}>{title}</Text>
      <Image style={globalStyles.cardImage} source={{ uri: image }} />
    </View>
  );
}
