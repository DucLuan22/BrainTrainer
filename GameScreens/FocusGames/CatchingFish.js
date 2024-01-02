import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

const CatchingFish = ({ navigation: { goBack } }) => {
  const fixedBoatPositions = [
    { x: 220, y: 100 },
    { x: 120, y: 210 },
    { x: 250, y: 350 },
    { x: 100, y: 550 },
    { x: 250, y: 650 },
  ];

  const [sharkPositions] = useState([
    new Animated.ValueXY({ x: -100, y: 800 }),
    new Animated.ValueXY({ x: -100, y: -200 }),
    new Animated.ValueXY({ x: -100, y: -300 }),
    new Animated.ValueXY({ x: 800, y: 800 }),
    new Animated.ValueXY({ x: -100, y: -100 }),
  ]);

  const [points, setPoints] = useState(3000);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes

  const intervalRef = useRef(null);

  const resetAndMoveShark = (sharkPosition, sharkIndex) => {
    const randomBoatIndex = Math.floor(
      Math.random() * fixedBoatPositions.length
    );
    const randomBoat = fixedBoatPositions[randomBoatIndex];

    Animated.timing(sharkPosition, {
      toValue: { x: randomBoat.x, y: randomBoat.y },
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      const collidedBoat = fixedBoatPositions.find(
        (boat) =>
          Math.abs(boat.x - sharkPosition.x._value) < 30 &&
          Math.abs(boat.y - sharkPosition.y._value) < 30
      );

      if (collidedBoat) {
        sharkPosition.setValue({ x: -100, y: -100 });
        setPoints((prevPoints) => prevPoints - 50);
        setTimeout(() => resetAndMoveShark(sharkPosition, sharkIndex), 2000);
      }
    });
  };

  const removeShark = (sharkPosition, sharkIndex) => {
    sharkPosition.setValue({ x: -100, y: -100 });
    setTimeout(() => resetAndMoveShark(sharkPosition, sharkIndex), 2000);
  };

  useEffect(() => {
    sharkPositions.forEach((sharkPosition, index) => {
      setTimeout(() => {
        resetAndMoveShark(sharkPosition, index);
      }, index * 2000);
    });

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 || points <= 0) {
      setGameOver(true);

      sharkPositions.forEach((sharkPosition) => {
        sharkPosition.stopAnimation();
      });

      clearInterval(intervalRef.current);

      if (timeLeft === 0) {
        Alert.alert(
          "Congratulations!",
          `Your score: ${points}`,
          [
            {
              text: "Go Back",
              onPress: () => goBack(),
            },
            {
              text: "Try Again",
              onPress: () => restartGame(),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Game Over",
          "You lost!",
          [
            {
              text: "Go Back",
              onPress: () => goBack(),
            },
            {
              text: "Try Again",
              onPress: () => restartGame(),
            },
          ],
          { cancelable: false }
        );
      }
    }
  }, [timeLeft, points]);

  const restartGame = () => {
    setPoints(3000);
    setTimeLeft(120);
    setGameOver(false);

    sharkPositions.forEach((sharkPosition, index) => {
      sharkPosition.setValue({ x: -100, y: index % 2 === 0 ? -200 : 800 });
      setTimeout(() => {
        resetAndMoveShark(sharkPosition, index);
      }, index * 2000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={styles.content}>
        <Text style={styles.pointsText}>Points: {points}</Text>
        <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>
        <View style={styles.gameContainer}>
          {fixedBoatPositions.map((position, index) => (
            <Image
              key={index}
              source={require("../../assets/catch-fish/boat.png")}
              style={[styles.image, { top: position.y, left: position.x }]}
            />
          ))}
          {sharkPositions.map((sharkPosition, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => removeShark(sharkPosition, index)}
            >
              <Animated.Image
                source={require("../../assets/catch-fish/shark.png")}
                style={[
                  styles.image,
                  { top: sharkPosition.y, left: sharkPosition.x },
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 50,
  },
  gameContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  gameOverButtons: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -75 }, { translateY: -25 }],
  },
  gameOverButton: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  pointsText: {
    position: "absolute",
    top: -20,
    left: 150,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  timerText: {
    position: "absolute",
    top: 10,
    left: 120,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default CatchingFish;
