import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CategoryItem from "../components/CategoryItem";

function HomeScreen({ navigation }) {
  const data = [
    {
      text: "Memory Games",
      noOfGame: 3,
      thumbnail: require("../assets/category-thumbnails/brain-games.png"),
      icon: require("../assets/category-description/brain-icon.png"),
      nav: navigation,
      games: [
        {
          name: "Memorize Sequence",
          thumbnail: require("../assets/game-thumbnails/sequence.png"),
          navigationTarget: "sequence-game",
        },
        {
          name: "Avoid Duplication",
          thumbnail: require("../assets/game-thumbnails/avoid-dupilcate.png"),
          navigationTarget: "avoid-duplicate-game",
        },
        {
          name: "What Is That Image?",
          thumbnail: require("../assets/game-thumbnails/choice.png"),
          navigationTarget: "find-missing-game",
        },
      ],
    },
    {
      text: "Focus Games",
      noOfGame: 3,
      thumbnail: require("../assets/category-thumbnails/focus.png"),
      icon: require("../assets/category-description/brain-icon.png"),
      nav: navigation,
      games: [
        {
          name: "Find The Odd One",
          thumbnail: require("../assets/game-thumbnails/search.png"),
          navigationTarget: "find-the-odd-one-game",
        },
        {
          name: "Matching Pairs",
          thumbnail: require("../assets/game-thumbnails/pair.png"),
          navigationTarget: "matching-pair-game",
        },
        {
          name: "Catching Fishes",
          thumbnail: require("../assets/game-thumbnails/fish.png"),
          navigationTarget: "catching-fish",
        },
      ],
    },
    {
      text: "Language Games",
      noOfGame: 4,
      thumbnail: require("../assets/category-thumbnails/languages.png"),
      icon: require("../assets/category-description/brain-icon.png"),
      nav: navigation,
      games: [
        {
          name: "Find The Next Word",
          thumbnail: require("../assets/game-thumbnails/begin-word.png"),
          navigationTarget: "find-next-word",
        },
        {
          name: "Find The Remaining Letters",
          thumbnail: require("../assets/game-thumbnails/find-next.png"),
          navigationTarget: "find-remain-letter",
        },
        {
          name: "Link Words",
          thumbnail: require("../assets/game-thumbnails/link.png"),
          navigationTarget: "link-words",
        },
        {
          name: "Scramble Words",
          thumbnail: require("../assets/game-thumbnails/word-find.png"),
          navigationTarget: "scramble-words",
        },
      ],
    },
    {
      text: "Mathematic Games",
      noOfGame: 2,
      thumbnail: require("../assets/category-thumbnails/math.png"),
      icon: require("../assets/category-description/brain-icon.png"),
      nav: navigation,
      games: [
        {
          name: "Find The Sum",
          thumbnail: require("../assets/game-thumbnails/sum.png"),
          navigationTarget: "find-sum",
        },
        {
          name: "Shopping Game",
          thumbnail: require("../assets/game-thumbnails/shopping.png"),
          navigationTarget: "shopping-game",
        },
      ],
    },
  ];

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

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
        <Text style={styles.selectGamesText}>Select Game Types</Text>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <FontAwesome5Icon name="chevron-down" size={30} color={"black"} />
        </Animated.View>
      </View>
      <View>
        <Carousel
          width={width}
          height={height - 30}
          autoPlay={false}
          data={data}
          scrollAnimationDuration={1000}
          renderItem={({ index, item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <CategoryItem
                text={item.text}
                navigation={item.nav}
                thumbnail={item.thumbnail}
                noOfGame={item.noOfGame}
                icon={item.icon}
                games={item.games}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
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
