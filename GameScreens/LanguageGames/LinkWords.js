import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

const words = [
  "butter cup",
  "cup cake",
  "cake stand",
  "stand up",
  "up town",
  "town square",
  "square dance",
  "dance floor",
  "floor plan",
  "plan ahead",
  "ahead start",
  "start line",
  "line break",
  "break point",
  "point guard",
  "guard dog",
  "dog house",
  "house party",
  "party favor",
  "favor bag",
  "bag pack",
  "pack lunch",
  "lunch break",
  "break time",
  "time travel",
  "travel guide",
  "guide book",
  "book club",
  "club house",
  "house warming",
  "warming trend",
  "trend setter",
  "setter point",
  "point blank",
  "blank slate",
  "slate clean",
  "clean energy",
  "energy boost",
  "boost morale",
  "morale high",
  "high five",
  "five star",
  "star gazing",
  "gazing sky",
  "sky diving",
  "diving board",
  "board game",
  "game night",
  "night owl",
  "owl hoot",
  "hoot owl",
  "owl eyes",
  "eyes wide",
  "wide open",
  "open sesame",
  "sesame street",
  "street sign",
  "sign post",
  "post office",
  "office space",
  "space station",
  "station master",
  "master key",
  "key holder",
  "holder cup",
  "cup of tea",
  "tea time",
  "time machine",
  "machine learning",
  "learning curve",
  "curve ball",
  "ball game",
  "game over",
  "over time",
];

const LinkWords = ({ navigation: { goBack }, navigation }) => {
  const initialWord = "butter";
  const [data, setData] = useState(words);
  const [inputWord, setInputWord] = useState("");
  const [round, setRound] = useState(1);
  const [previousInput, setPreviousInput] = useState("");
  const [previousWord, setPreviousWord] = useState([]);
  const [timer, setTimer] = useState(60); // Timer set to 60 seconds initially
  const [points, setPoints] = useState(0); // Point counter

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(countdown);
      // Game over logic - show an alert
      navigation.navigate("ScreenEnd", { points: points });
    }

    return () => clearInterval(countdown);
  }, [timer, points, goBack]);

  const checkWord = () => {
    const matchingWord = data.find(
      (word) =>
        word ===
        (round === 1
          ? initialWord + " " + inputWord
          : previousInput + " " + inputWord)
    );
    if (matchingWord) {
      setPoints((prevPoints) => prevPoints + 200); // Increment points on match
      setPreviousInput(inputWord);
      setData([...data.filter((word) => word !== matchingWord)]);
      setInputWord("");
      setPreviousWord((preState) => [
        matchingWord.replace(/\s/g, ""),
        ...preState,
      ]);
      setRound(round + 1);
      setTimer(60); // Reset the timer to 30 seconds upon a correct match
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} text={"Round " + round} />
      <Text
        style={{
          fontSize: 18,
          marginVertical: 10,
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Time Remaining: {timer} seconds
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginVertical: 10,
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        Points: {points}
      </Text>
      <View style={styles.content}>
        <Text style={styles.word}>
          {round === 1 ? initialWord : previousInput} ____
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a word"
          value={inputWord}
          onChangeText={(text) => setInputWord(text)}
        />
        <TouchableOpacity style={styles.button} onPress={checkWord}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", gap: 5, marginTop: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {previousWord[0] ? "- Previous Word -" : ""}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "400" }}>
            {previousWord[0] ? previousWord[0] : ""}
          </Text>
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
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LinkWords;
