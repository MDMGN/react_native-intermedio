import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

type Props = {
  name: string;
  image: string;
  aliases?: string[];
};

export default function SearchItem({ name, image, aliases }: Props) {
  return (
    <View
      style={{
        marginVertical: 20,
        gap: 20,
        width: "100%",
        flexDirection: "row",
        padding: 10,
      }}
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.aliases}>
          {aliases?.length ? aliases.join(", ") : "..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {},
  aliases: { opacity: 0.7 },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
});
