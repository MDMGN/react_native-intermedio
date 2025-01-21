import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Easing,
} from "react-native";
import { globalStyles } from "../themes/globalStyles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { StackProps } from "../navigation/StackGroup";
import { ScrollView } from "react-native-gesture-handler";

export default function HeroeScreen() {
  const {
    params: { title, description, image },
  } = useRoute<RouteProp<StackProps, "HERO">>();
  const { setOptions } = useNavigation();
  const scrollAnima = useAnimatedValue(0);
  const MIN_VALUE = 70,
    MAX_VALUE = 200,
    DISTANCE_HEIGHT = MAX_VALUE - MIN_VALUE;

  useLayoutEffect(() => {
    setOptions({
      title,
    });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Animated.View
        style={[
          {
            filter: "drop-shadow(0px 0px 10px black)",
            justifyContent: "center",
            marginVertical: 100,
            marginHorizontal: 5,
            width: "100%",
            backgroundColor: "#FF0000",
            opacity: scrollAnima.interpolate({
              inputRange: [0, DISTANCE_HEIGHT],
              outputRange: [0.7, 1],
              extrapolate: "clamp",
            }),
            height: scrollAnima.interpolate({
              inputRange: [0, DISTANCE_HEIGHT],
              outputRange: [MAX_VALUE, MIN_VALUE],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <Text style={globalStyles.title}>{title}</Text>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={20}
        contentContainerStyle={{
          gap: 20,
          alignItems: "center",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollAnima } } }],
          {
            useNativeDriver: false,
          }
        )}
      >
        <Image
          source={{ uri: image }}
          style={{ aspectRatio: "16/12", resizeMode: "stretch", height: 300 }}
        />
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    padding: "5%",
    textAlign: "left",
    width: "80%",
    writingDirection: "auto",
  },
});
