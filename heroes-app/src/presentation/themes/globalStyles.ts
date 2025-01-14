import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  cardContainer: {
    width: "80%",
    marginHorizontal: "20%",
    height: 300,
    backgroundColor: colors.secondary,
    marginVertical: 20,
    paddingVertical: 20,
    alignSelf: "center",
    borderRadius: 20,
    filter: `drop-shadow(0px 0px 10px ${colors.black})`,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 10,
    filter: "invert(1)",
  },
  cardImage: {
    height: "80%",
    alignSelf: "center",
    aspectRatio: "16/12",
    resizeMode: "stretch",
    boxShadow: `2px 3px 5px ${colors.black}`,
  },
});
