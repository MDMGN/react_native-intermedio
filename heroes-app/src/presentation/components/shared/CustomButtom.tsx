import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

interface Props {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  textSize?: number;
  content: string | React.ReactNode;
  onPress: () => void;
  borderRadius?: number;
}

export default function CustomButton({
  width = 150,
  height = 50,
  backgroundColor,
  textColor,
  textSize = 16,
  content,
  onPress,
  borderRadius = 10,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor, width, height, borderRadius }]}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor, fontSize: textSize }]}>
        {content}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 3,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
