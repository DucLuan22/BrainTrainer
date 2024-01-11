import React from "react";
import GameTopBar from "../../components/GameTopBar";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import dataset from "./FindTheNextWord/dataset";
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
  const [timeEnd, setTimeEnd] = useState(100);
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    a = Math.floor(Math.random() * wordList.length);
    setRandomIndex(a);
    setCurrentWord(wordList[a]);
  }, []);
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
  };

  const showChatMessage = () => {
    setShowChat(true);
    setTimeout(() => {
      setShowChat(false);
    }, 3000);
  };
  useEffect(() => {
    setTimeout(() => {
      setTimeEnd(timeEnd - 1);
    }, 1000);
    if (timeEnd < 1) {
      navigation.navigate("ScreenEnd", { points: score });
    }
  }, [timeEnd]);
  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={{ display: "flex", alignItems: "center", fontSize: 30 }}>
        <Text>{timeEnd}</Text>
      </View>
      <View
        style={{
          height: 200,
          display: "flex",
          borderWidth: 1,
          padding: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Enter the next words begin by {currentWord}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          Current Word: {currentWord + nextWord}
        </Text>
        <Text>Score: {score}</Text>
      </View>
      <View
        style={{
          height: "10px",
          margin: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ borderBottomWidth: 1, margin: 5, fontSize: 20 }}
          onChangeText={(text) => setNextWord(text)}
          placeholder={"Enter here!"}
          maxLength={7}
          value={nextWord}
        />
        <Text style={{ alignSelf: "flex-end" }}>{nextWord.length}/7</Text>
      </View>
      <View
        style={{
          height: "10px",
          margin: 15,
          display: "flex",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Button
          title="Submit"
          onPress={() => checkAnswer()}
          style={{ padding: 10 }}
        />
      </View>
      {showChat && (
        <View style={{ backgroundColor: "lightblue", padding: 10, margin: 10 }}>
          <Text>{feedback}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
