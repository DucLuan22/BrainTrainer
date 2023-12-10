import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CategoryItem from "../components/CategoryItem";
import GameItem from "../components/GameItem";

export default function GameSelectionScreen({ navigation, route }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const { games } = route.params;
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loopAnimation.start();
    return () => loopAnimation.stop();
  }, [scaleValue]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.selectGamesText}>Select Games</Text>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <FontAwesome5Icon name="chevron-down" size={30} color={"black"} />
        </Animated.View>
      </View>
      <View>
        <Carousel
          width={width}
          height={height - 30}
          autoPlay={false}
          data={games}
          scrollAnimationDuration={1000}
          renderItem={({ index, item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <GameItem
                name={item.name}
                thumbnail={item.thumbnail}
                navigationTarget={item.navigationTarget}
                index={index}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  textContainer: {
    marginTop: 50,
    alignItems: "center",
    rowGap: 10,
  },
  selectGamesText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
});
