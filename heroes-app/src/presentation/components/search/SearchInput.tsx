import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { debounce } from "../../../config/helpers/debounce";

type Props = {
  onChange: (query: string) => void;
};

export default function SearchInput({ onChange }: Props) {
  const inputRef = useRef<TextInput>(null);

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
        ref={inputRef}
        keyboardType="default"
        placeholder="Buscar..."
        onChangeText={debounce(onChange, 300)}
      />
      <Pressable
        onPress={() => inputRef.current?.clear()}
        style={{
          position: "absolute",
          right: 0,
          top: 7,
        }}
      >
        <AntDesign name="closecircleo" size={24} color="black" />
      </Pressable>
    </View>
  );
}
const syles = StyleSheet.create({});
