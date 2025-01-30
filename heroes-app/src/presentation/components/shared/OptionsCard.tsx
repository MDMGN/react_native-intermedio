import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

type Option = {
  title: string;
  callback: () => void;
};
type Props = {
  options: Option[];
};

export default function OptionsCard({ options }: Props) {
  return (
    <View style={styles.container}>
      {options.map((option, i) => (
        <Pressable style={styles.btn} onPress={option.callback} key={i}>
          <View>
            <Text style={{ color: "#000", textAlign: "center" }}>
              {option.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#00000098",
    height: "120%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 5,
  },
  btn: {
    width: "80%",
    height: 25,
    backgroundColor: "#ddd",
  },
});
