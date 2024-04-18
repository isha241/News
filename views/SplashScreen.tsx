import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
export default function SplashScreen({ navigation }: { navigation: any }) {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 3000);
  }, []);
  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.imageContainer, { opacity: fadeAnimation }]}
      >
        <Image
          style={styles.image}
          source={require("../assets/icons/news.png")}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    // resizeMode: "cover",
  },
});
