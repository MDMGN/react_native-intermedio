import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
        onChangeText={(text) => onChange(text)}
      />
    </View>
  );
}
const syles = StyleSheet.create({});
