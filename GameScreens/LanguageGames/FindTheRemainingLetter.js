import { onPress } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

const words = [
  { first: "butter", second: "fly" },
  { first: "butter", second: "cup" },
  { first: "butter", second: "knife" },
  { first: "cup", second: "cake" },
  { first: "cup", second: "bearer" },
  { first: "cup", second: "lid" },
  { first: "base", second: "ball" },
  { first: "base", second: "camp" },
  { first: "base", second: "line" },
  { first: "rain", second: "bow" },
  { first: "rain", second: "coat" },
  { first: "rain", second: "drop" },
  { first: "star", second: "fish" },
  { first: "star", second: "gaze" },
  { first: "star", second: "light" },
  { first: "back", second: "bone" },
  { first: "back", second: "pack" },
  { first: "back", second: "yard" },
  { first: "light", second: "house" },
  { first: "light", second: "beam" },
  { first: "light", second: "weight" },
  { first: "moon", second: "light" },
  { first: "moon", second: "shine" },
  { first: "moon", second: "walk" },
  { first: "snow", second: "man" },
  { first: "snow", second: "ball" },
  { first: "snow", second: "flake" },
  { first: "black", second: "berry" },
  { first: "black", second: "board" },
  { first: "black", second: "hole" },
];

const FindTheRemainingLetter = ({ navigation: { goBack } }) => {
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState(words);
  const [timer, setTimer] = useState(60);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0 && showResult === false) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setShowResult(true);
      Alert.alert(
        "Time's up!",
        "Try another word from the list.",
        [
          {
            text: "Reset Game",
            onPress: () => {
              setTimer(60);
              setShowResult(false);
              setUserInput("");
              setData(words);
              setPoints(0);
            },
          },
          {
            text: "Go back",
            onPress: () => {
              goBack();
            },
          },
        ],
        { cancelable: false }
      );
    }
    return () => clearInterval(interval);
  }, [timer, showResult]);

  useEffect(() => {
    setTimer(60);
  }, [data]);

  const filterWords = (inputArray, filterObject) => {
    return inputArray.filter(
      (word) =>
        word.first !== filterObject.first || word.second !== filterObject.second
    );
  };

  const checkAnswer = () => {
    const userWord = userInput.toLowerCase();
    const matchingWord = data.find(
      (word) =>
        (word.first + word.second).toLowerCase() === data[0].first + userInput
    );

    if (matchingWord) {
      const updatedData = filterWords(data, matchingWord);
      setData(updatedData);
      setUserInput("");
      setShowResult(true);
      setPoints((prevPoints) => prevPoints + 200); // Adding points for correct word
      Alert.alert(
        "Correct Answer!",
        `Press 'Next' to move on to the next word.`,
        [
          {
            text: "Next",
            onPress: () => {
              nextWord();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setShowResult(false);
      alert("Incorrect! Try another word from the list.");
    }
  };

  const nextWord = () => {
    if (data.length > 0) {
      setUserInput("");
      setShowResult(false);
    } else {
      alert("You've completed all the words!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <Text style={styles.pointContainer}>Scores: {points} points</Text>
      <View style={styles.content}>
        <Text style={styles.word}>{data[0].first + "_____"}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
          editable={!showResult}
        />
        <Button title="Check" onPress={checkAnswer} disabled={showResult} />

        <Text style={{ marginTop: 7 }}>Time remaining: {timer} seconds</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pointContainer: {
    marginVertical: 30,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    alignItems: "center",
  },
  list: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default FindTheRemainingLetter;
