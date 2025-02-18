import { View, Text, StyleSheet, Pressable } from "react-native";

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
            <Text style={styles.btnText}>{option.title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.8)",
    height: "115%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 5,
  },
  btn: {
    width: "80%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 20,
  },
  btnText: {
    color: "#000000",
    textAlign: "center",
    alignItems: "center",
    fontWeight: "500",
    fontSize: 15,
  },
});
