import { View, Text, Image } from "react-native";
import { globalStyles } from "../../themes/globalStyles";
import { TextInput } from "react-native-gesture-handler";

type Props = {
  title: string;
  image: string;
};

export function HeroCard({ title, image }: Props) {
  return (
    <View style={globalStyles.cardContainer}>
      <Text style={globalStyles.title}>{title}</Text>
      <Image style={[globalStyles.cardImage]} source={{ uri: image }} />
    </View>
  );
}
