import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

export default function FindTheOddOneOut({ navigation: { goBack } }) {
  const timerValue = 3000;
  const [isCircleClicked, setIsCircleClicked] = useState(false);
  const [circleEnabled, setCircleEnabled] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timer, setTimer] = useState(timerValue);
  const [points, setPoints] = useState(0);

  const gameData = [
    {
      image: require("../../assets/odd-on-out/pic1.png"),
      top: 240,
      right: 50,
    },
    {
      image: require("../../assets/odd-on-out/pic2.png"),
      top: 350,
      right: 75,
    },
    {
      image: require("../../assets/odd-on-out/pic3.png"),
      top: 320,
      right: 40,
    },
    {
      image: require("../../assets/odd-on-out/pic4.png"),
      top: 465,
      right: 0,
    },
    {
      image: require("../../assets/odd-on-out/pic5.png"),
      top: 360,
      right: 115,
    },
    {
      image: require("../../assets/odd-on-out/pic6.png"),
      top: 480,
      right: 340,
    },
    {
      image: require("../../assets/odd-on-out/pic7.png"),
      top: 215,
      right: 155,
    },
    {
      image: require("../../assets/odd-on-out/pic8.png"),
      top: 315,
      right: 235,
    },
  ];

  const handleCircleClick = () => {
    if (circleEnabled) {
      setIsCircleClicked(true);
      setCircleEnabled(false);

      setPoints((prevPoints) => prevPoints + 100); // Add 100 points on click
      setTimer(timerValue); // Reset timer to initial value
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === gameData.length - 1 ? 0 : prevIndex + 1
        );
        setIsCircleClicked(false);
        setCircleEnabled(true);
      }, 2000); // Change to the desired duration in milliseconds
    }
  };

  useEffect(() => {
    let countdown;
    if (!isCircleClicked && circleEnabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    } else {
      clearInterval(countdown);
      if (timer === 0) {
        Alert.alert(
          "Time's Up!",
          "The time has run out, please try again.",
          [
            {
              text: "Cancel",
              onPress: () => goBack(), // Navigate back on cancel
              style: "cancel",
            },
            {
              text: "Retry",
              onPress: () => {
                setCurrentImageIndex(0); // Restart the game on retry
                setCircleEnabled(true);
                setTimer(timerValue);
                setPoints(0); // Reset points on retry
              },
            },
          ],
          { cancelable: false }
        );
      }
    }

    return () => clearInterval(countdown);
  }, [isCircleClicked, circleEnabled, timer]);

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>
          Count down:{" "}
          {!isCircleClicked && circleEnabled ? (
            <Text style={styles.timerText}>{timer}</Text>
          ) : (
            "Reset..."
          )}
        </Text>

        <Text style={styles.pointsText}>Points: {points}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={gameData[currentImageIndex].image}
        />
        <View style={styles.overlay}>
          <TouchableWithoutFeedback
            onPress={handleCircleClick}
            disabled={!circleEnabled}
          >
            <View
              style={[
                styles.circle,
                isCircleClicked
                  ? { borderColor: "red" }
                  : { borderColor: "transparent" },
                {
                  top: gameData[currentImageIndex].top,
                  right: gameData[currentImageIndex].right,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Add any other styles for the container if needed
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
  },
  pointsText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ensure proper positioning of the overlay
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute", // Position the image absolutely within the container
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 5,
    position: "absolute",
  },
});
