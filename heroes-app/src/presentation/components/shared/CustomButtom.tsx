import { View, Text, Pressable } from "react-native";
import React from "react";

type Props = {
  width?: number;
  height: number;
  backgroundColor?: string;
  textColor?: string;
  textSize?: number;
  content: string | React.ReactNode;
  onPress: () => void;
};
export default function CustomButtom({
  textColor,
  textSize,
  backgroundColor,
  height,
  width,
  onPress,
  content,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: backgroundColor ?? "#fff", width, height }}
    >
      <Text
        style={{
          color: textColor ?? "#000",
          fontSize: textSize ?? 18,
        }}
      >
        {content}
      </Text>
    </Pressable>
  );
}
