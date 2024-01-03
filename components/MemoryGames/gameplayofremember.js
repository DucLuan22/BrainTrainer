import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Animated,
} from "react-native";
import ScoreDisplay from "./scoredisplay";

const BlackSquareGame = ({ setRound }) => {
  const [count, setCount] = useState(3);
  const animatedValue = new Animated.Value(0);

  const levelGrid = [6, 9, 12, 16, 20];
  // const dispatch = useDispatch();
  const initLevel = 0;
  const [score, setScore] = useState(initLevel);
  const [squares, setSquares] = useState([]);
  // const [hintSquare,setHintSquare] = useState([])
  const [currentLevel, setCurrentLevel] = useState(initLevel);
  const [isVisible, setIsVisible] = useState(true);
  // Adjust the grid size as needed

  const getRandomNumber = (min, max, excludedNumbers) => {
    let random;
    do {
      random = Math.floor(Math.random() * (max - min + 1) + min);
    } while (excludedNumbers.includes(random));
    return random;
  };

  // count score
  const handleIncrement = () => {
    setScore(score + 100);
  };
  // fun to set value
  const levelUp = () => {
    console.log("level up", currentLevel);
    setCount(3);
    setRound(currentLevel + 1);
    setCurrentLevel(currentLevel + 1);
    setIsVisible(true);
  };

  // create square to render
  const generateSquares = (level) => {
    const minRange = 0;
    const maxRange = levelGrid[level] - 1;
    const newRandomNumbers = [];
    // init create a square to remember
    while (newRandomNumbers.length < levelGrid[level] / 3) {
      const newRandom = getRandomNumber(minRange, maxRange, newRandomNumbers);
      newRandomNumbers.push(newRandom);
    }
    const numberOfSquares = levelGrid[level]; // Adjust the number of squares as needed
    const newSquares = Array.from({ length: numberOfSquares }, (_, index) => ({
      color: "#fff",
      rightSquare: newRandomNumbers.includes(index), // Mark the last square as the "right square"
    }));

    return newSquares;
  };

  //
  const initGamePlay = async (level) => {
    try {
      console.log("init Game Play Level", level);
      await setSquares(generateSquares(level));
    } catch (error) {
      console.log(error);
    }
  };
  //reset game
  const resetGame = () => {
    setSquares(generateSquares(currentLevel));
    setIsVisible(true);
    hideText();
  };
  // condition for game win or lose
  const showAnnouncementLose = () => {
    Alert.alert("loss", "Ok to Reload this round an item", [
      { text: "OK", onPress: () => resetGame() },
    ]);
  };
  const showAnnouncementPass = () => {
    Alert.alert("pass", "Ok to next level", [
      { text: "OK", onPress: () => levelUp() },
    ]);
  };

  const CheckPassLevel = (level) => {
    let passVal = 0;
    console.log(`check Pass level:${currentLevel}`);
    squares.map((e) => {
      if (e.color === "#243bad") {
        passVal++;
      }
    });

    if (passVal == level + 2) {
      return true;
    } else {
      return false;
    }
  };

  //
  const hideText = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Re-show after 12 seconds
  }; // Clear the timer if the component is unmounted

  const handleSquarePress = async (index) => {
    const newSquares = [...squares];
    if (squares[index].rightSquare) {
      newSquares[index].color = "#243bad";
      setSquares(newSquares);
      handleIncrement();
      try {
        console.log(CheckPassLevel(currentLevel));
        if (CheckPassLevel(currentLevel)) {
          showAnnouncementPass();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      newSquares[index].color = "#e82727";
      setSquares(newSquares);
      try {
        showAnnouncementLose();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (count > 0) {
      const timerId = setInterval(() => {
        setCount(count - 1);
        animatedValue.setValue(0);
        if (count == 0) {
          Close();
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [count]);

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.5, 1],
        }),
      },
    ],
    fontSize: 100,
  };

  useEffect(() => {
    initGamePlay(currentLevel);
    hideText();
    setRound(currentLevel + 1);
  }, [currentLevel]);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ScoreDisplay data={score} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 5,
        }}
      >
        {count > 0 ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.Text style={animatedStyle}>{count}</Animated.Text>
            </View>
          </>
        ) : (
          <>
            {isVisible && (
              <View style={styles.container}>
                {squares.map((e, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.square,
                      { backgroundColor: squares[index].color },
                    ]}
                    onPress={() => handleSquarePress(index)}
                  />
                ))}
              </View>
            )}
            {!isVisible && (
              <View style={styles.container}>
                {squares.map((e, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.square,
                      {
                        backgroundColor: squares[index].rightSquare
                          ? "#243bad"
                          : "#fff",
                      },
                    ]}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  square: {
    width: 80, // Adjust the square size as needed
    height: 80,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
});

export default BlackSquareGame;
