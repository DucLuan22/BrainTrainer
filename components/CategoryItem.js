import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function CategoryItem({
  text,
  navigation,
  thumbnail,
  noOfGame,
  icon,
  games,
}) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Games", { games })}
    >
      <View style={styles.element}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode="contain" source={thumbnail} />
        </View>
        <View style={styles.description}>
          <Image style={{ width: 40, height: 40 }} source={icon} />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>{text}</Text>
            <Text>{noOfGame} in Total</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const shadowStyles =
  Platform.OS === "android"
    ? {
        elevation: 6,
      }
    : {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6, // For iOS
      };

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  element: {
    width: "85%",
    height: "80%",
    backgroundColor: "white",
    padding: 20,
    rowGap: 20,
    borderRadius: 20,
    ...shadowStyles,
  },
  imageContainer: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
