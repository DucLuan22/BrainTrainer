import React from "react";
import GameTopBar from "../../components/GameTopBar";
import { Text, StyleSheet, TextInput, Button, View } from "react-native";
import { useState, useEffect } from "react";
import dataset from "./FindTheNextWord/dataset";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindTheNextWord({
  navigation: { goBack },
  navigation,
}) {
  const [randomIndex, setRandomIndex] = useState(0);
  const wordList = ["beg", "mag", "spi", "col"];
  const [currentWord, setCurrentWord] = useState(wordList[0]);
  const [chosenword, setChosen] = useState([]);
  const [nextWord, setNextWord] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeEnd, setTimeEnd] = useState(30);
  const [showChat, setShowChat] = useState(false);

  // Function to randomize the word index
  const randomizeWord = () => {
    const newIndex = Math.floor(Math.random() * wordList.length);
    setRandomIndex(newIndex);
    setCurrentWord(wordList[newIndex]);
  };

  // Effect to run when component mounts to set initial word
  useEffect(() => {
    randomizeWord();
  }, []);

  // Function to check the user's answer
  const checkAnswer = () => {
    const chosen = chosenword.includes(currentWord + nextWord);
    const isCorrect = dataset[randomIndex][currentWord].includes(
      currentWord + nextWord
    );

    if (chosen) {
      setFeedback("The word is chosen");
    } else if (isCorrect) {
      setChosen([...chosenword, currentWord + nextWord]);
      setFeedback("Correct! The word is in the list.");
      setScore(score + 100);
    } else {
      setFeedback("Incorrect. The word is not in the list.");
    }

    showChatMessage();
    setNextWord("");
    randomizeWord(); // Change the word for the next round
  };

  // Function to show feedback message for a limited time
  const showChatMessage = () => {
    setShowChat(true);
    setTimeout(() => {
      setShowChat(false);
    }, 3000);
  };

  // Effect to run the countdown and navigate to the end screen when time ends
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeEnd((prevTime) => prevTime - 1);
    }, 1000);

    if (timeEnd < 1) {
      clearInterval(countdown);
      navigation.navigate("ScreenEnd", { points: score });
    }

    return () => clearInterval(countdown); // Cleanup on component unmount
  }, [timeEnd, navigation, score]);

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.timerText}>Time Remaining: {timeEnd}</Text>
          <Text style={styles.boldText}>
            Enter the next words beginning with {currentWord}___
          </Text>
          <Text style={styles.boldText}>
            Current Word: {currentWord + nextWord}
          </Text>
          <Text>Score: {score}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setNextWord(text)}
            placeholder={"Enter here!"}
            maxLength={7}
            value={nextWord}
          />
          <Text style={styles.characterCount}>{nextWord.length}/7</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={() => checkAnswer()}
            style={styles.submitButton}
          />
        </View>
        {showChat && (
          <View style={styles.feedbackContainer}>
            <Text>{feedback}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  infoContainer: {
    height: 200,
    padding: 10,
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  boldText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  inputContainer: {
    height: 50,
    marginVertical: 20,
    alignItems: "center",
  },
  inputField: {
    borderBottomWidth: 1,
    margin: 5,
    fontSize: 20,
  },
  characterCount: {
    alignSelf: "flex-end",
  },
  buttonContainer: {
    marginVertical: 15,
    alignItems: "center",
    padding: 10,
  },
  submitButton: {
    padding: 10,
  },
  feedbackContainer: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
  },
});
