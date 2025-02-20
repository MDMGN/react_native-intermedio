import { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TextInput } from "react-native-gesture-handler";
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
        onChangeText={debounce(onChange, 500)}
      />
      <AntDesign
        name="closecircleo"
        size={24}
        color="black"
        style={{
          position: "absolute",
          right: 0,
          top: 7,
        }}
        onPress={() => inputRef.current?.clear()}
      />
    </View>
  );
}
