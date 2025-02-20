import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, TextInput } from "react-native-gesture-handler";

type Props = {
  onChange: (query: string) => void;
};

export default function SearchInput({ onChange }: Props) {
  const [query, setQuery] = useState("");
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        right: 10,
        top: 5,
      }}
    >
      <TextInput
        keyboardType="default"
        placeholder="Buscar..."
        onChangeText={(text) => {
          setQuery(text);
          onChange(text);
        }}
        value={query}
      />
      {query !== "" && (
        <AntDesign
          name="closecircleo"
          size={24}
          color="black"
          style={{
            position: "absolute",
            right: 0,
            top: 7,
          }}
          onPress={() => setQuery("")}
        />
      )}
    </View>
  );
}
const syles = StyleSheet.create({});
