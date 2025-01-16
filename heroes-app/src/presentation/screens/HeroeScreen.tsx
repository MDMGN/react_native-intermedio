import { View, Text, Image, StyleSheet } from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StackProps } from "../navigation/StackGroup";
import { ScrollView } from "react-native-gesture-handler";

export default function HeroeScreen() {
  const {
    params: { title, description, image },
  } = useRoute<RouteProp<StackProps, "HERO">>();
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      title,
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
      >
        <Text style={globalStyles.title}>{title}</Text>
        <Image
          source={{ uri: image }}
          style={{ aspectRatio: "16/12", resizeMode: "stretch", height: 300 }}
        />
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    padding: "5%",
    textAlign: "left",
    width: "80%",
    writingDirection: "auto",
  },
});
