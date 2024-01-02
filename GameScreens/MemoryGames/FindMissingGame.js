import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import GameTopBar from "../../components/GameTopBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindMissingGame({ navigation: { goBack } }) {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [questionMarkIndex, setQuestionMarkIndex] = useState(null);
  const [countdown, setCountdown] = useState(15);
  const [replaceDone, setReplaceDone] = useState(false);
  const [options, setOptions] = useState([]);
  const [replacedNumber, setReplacedNumber] = useState(null);
  const [countdownOver, setCountdownOver] = useState(false);
  const [points, setPoint] = useState(0);
  function generateUniqueRandomNumbers(number) {
    const min = 1;
    const max = 25;
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < 3) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
    }

    const numbersArray = Array.from(uniqueNumbers);

    const randomIndex = Math.floor(Math.random() * (numbersArray.length + 1));
    numbersArray.splice(randomIndex, 0, number);

    return numbersArray;
  }

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    let timeout;
    let interval;

    const startCountdown = () => {
      timeout = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * randomNumbers.length);
        setQuestionMarkIndex(randomIndex);

        const filteredOptions = randomNumbers.filter(
          (_, index) => index !== randomIndex
        );
        const randomOptions = Array.from(
          { length: 4 },
          () =>
            filteredOptions.splice(
              Math.floor(Math.random() * filteredOptions.length),
              1
            )[0]
        );
        console.log(randomNumbers[randomIndex]);
        randomOptions.push(randomNumbers[randomIndex]);
        randomOptions.sort(() => Math.random() - 0.5);
        setOptions(generateUniqueRandomNumbers(randomNumbers[randomIndex]));
        setCountdownOver(true);
      }, 15000);

      interval = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);
    };

    if (randomNumbers.length > 0 && !replaceDone) {
      startCountdown();
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [randomNumbers, replaceDone]);

  useEffect(() => {
    if (questionMarkIndex !== null && !replaceDone) {
      const updatedNumbers = [...randomNumbers];
      updatedNumbers[questionMarkIndex] = "?";
      setRandomNumbers(updatedNumbers);
      setReplaceDone(true);
      setReplacedNumber(randomNumbers[questionMarkIndex]);
    }
  }, [questionMarkIndex, randomNumbers, replaceDone]);

  const generateRandomNumbers = () => {
    const min = 1;
    const max = 25;
    const generatedNumbers = [];

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      generatedNumbers.push(randomNumber);
    }

    setRandomNumbers(generatedNumbers);
    setCountdown(15);
    setQuestionMarkIndex(null);
    setReplaceDone(false);
    setOptions([]);
    setReplacedNumber(null);
    setCountdownOver(false);
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity key={index} onPress={() => handleOptionPress(option)}>
        <Text style={styles.optionButton}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  const handleOptionPress = (selectedOption) => {
    let message = "";
    let isCorrect = false;

    if (parseInt(selectedOption) === replacedNumber) {
      message = "Correct option selected!";
      isCorrect = true;
    } else {
      message = "Incorrect option selected!";
    }

    if (isCorrect) {
      Alert.alert(
        "Correct",
        "Press 'Next' to move on",
        [
          {
            text: "Next",
            onPress: () => {
              setPoint((preState) => preState + 200);
              generateRandomNumbers();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Incorrect", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={styles.numbersContainer}>
        <Text style={styles.timerText}>Points: {points}</Text>
        <Text style={styles.timerText}>Countdown: {countdown}</Text>
        <View style={styles.row}>
          {randomNumbers.map((number, index) => (
            <Text
              key={index}
              style={[
                styles.text,
                index === questionMarkIndex && styles.questionMark,
              ]}
            >
              {number}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {countdownOver && options.length > 0 && renderOptions()}
      </View>
      {replacedNumber !== null && (
        <View style={styles.replacedNumberContainer}>
          <Text style={styles.replacedNumberText}>
            Replaced Number: {replacedNumber}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numbersContainer: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  questionMark: {
    fontWeight: "bold",
    color: "red",
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    fontSize: 16,
  },
  replacedNumberContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  replacedNumberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});
