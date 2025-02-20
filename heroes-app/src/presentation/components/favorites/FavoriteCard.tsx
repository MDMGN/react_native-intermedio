import { View, Text, Image } from "react-native";
import { globalStyles } from "../../themes/globalStyles";
import CustomButtom from "../shared/CustomButtom";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../navigation/StackGroup";
import { Hero } from "../../../domain/models/heroe";
import { useContext } from "react";
import { Actions } from "../../reducers/FavoritesReducer";
import { FavoritesContext } from "../../contexts/FavoritesProvider";
type Props = {
  hero: Hero;
};
export default function FavoriteCard({ hero }: Props) {
  const { navigate } = useNavigation<StackNavigationProp<StackProps>>();
  const { dispatch, favorites } = useContext(FavoritesContext);
  return (
    <View style={globalStyles.cardContainer}>
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundColor: "none",
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-between",
          gap: 25,
          zIndex: 5,
          elevation: 5,
        }}
      >
        <CustomButtom
          height={50}
          width={100}
          content={<Feather name="trash" size={24} color="black" />}
          onPress={() =>
            dispatch({ payload: hero, type: Actions.DELETE_FAVORITES })
          }
        />
        <CustomButtom
          height={50}
          width={100}
          content={<AntDesign name="rightcircleo" size={24} color="black" />}
          onPress={() => {
            navigate("HERO", hero);
          }}
        />
      </View>
      <Text style={globalStyles.title}>{hero.title}</Text>
      <Image source={{ uri: hero.image }} style={globalStyles.cardImage} />
    </View>
  );
}
