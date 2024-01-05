import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Box,
} from "react-native";

const wordsData = [
  {
    word: "square",
    hint: "A number multiplied by itself",
  },
  {
    word: "cube",
    hint: "A number multiplied by itself twice",
  },
];

class BoxContent {
  constructor(value) {
    this.value = value;
    this.isSelected = false;
    this.isReturn = false;
  }
}

export const HardLevel = ({ navigation }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [shuffledWord, setShuffledWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [orderedSelectedLetters, setOrderedSelectedLetters] = useState([]);
  const [remainingWords, setRemainingWords] = useState([...wordsData]);
  const [score, setScore] = useState(-100);
  const [initialBoxes, setInitialBoxes] = useState([]);

  const shuffleLetters = (letters) => {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  const stringToBoxContentArray = (inputString) => {
    return inputString.split("").map((char) => new BoxContent(char));
  };

  const handleLetterPress = (letter) => {
    setSelectedLetters([...selectedLetters, letter]);
    setOrderedSelectedLetters([...orderedSelectedLetters, letter]);
  };

  const getRandomWord = () => {
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      const selectedWord = remainingWords[randomIndex];
      setRemainingWords(
        remainingWords.filter((word, index) => index !== randomIndex)
      );
      setInitialBoxes(
        shuffleLetters(stringToBoxContentArray(selectedWord.word))
      );
      setCurrentWord(selectedWord.word);
      setShuffledWord(shuffleLetters(selectedWord.word.split("")).join(""));
      // setSelectedLetters([]);
      // setOrderedSelectedLetters([]);
    } else {
      navigation.navigate("ScreenEndScrambledWords", { score: score });
    }
  };

  useEffect(() => {
    const checkAnswer = () => {
      const selectedWord = selectedLetters.join("");
      if (selectedWord === currentWord) {
        setScore(score + 100);
        getRandomWord();
        setOrderedSelectedLetters([]);
        setSelectedLetters([]);
      } else {
        setOrderedSelectedLetters([]);
        setSelectedLetters([]);
        const updatedBoxes = initialBoxes.map((box) => ({
          ...box,
          isSelected: false,
        }));
        setInitialBoxes(updatedBoxes);
      }
    };
    if (orderedSelectedLetters.length === currentWord.length) {
      checkAnswer();
    }
  }, [orderedSelectedLetters]);
  useEffect(() => {
    getRandomWord();
  }, [score]);
  const ReturnedClick = (item, index) => {
    item.isReturn = false;
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 150,
          backgroundColor: "#0CB5A2",
          display: "flex",
          justifyContent: "center",
          borderRadius: 25,
        }}
      >
        <Text style={styles.scoreText}> Score: {score}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.wordContainer}>
          {initialBoxes.map((item, index) => (
            <Text
              key={index}
              style={[
                styles.wordText,
                orderedSelectedLetters[index] ? styles.correctLetter : null,
              ]}
            >
              {orderedSelectedLetters[index] || "_"}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.answerContainer}>
        <FlatList
          data={initialBoxes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={
                item.isSelected
                  ? styles.letterButtonChosen
                  : styles.letterButton
              }
              disabled={item.isSelected}
              onPress={() => {
                item.isSelected = true;
                handleLetterPress(item.value);
              }}
            >
              <Text style={styles.letterText}>{item.value}</Text>
            </TouchableOpacity>
          )}
          numColumns={4}
        />
      </View>
      <Text style={{ paddingTop: 20 }}>
        Hint:{" "}
        {wordsData.find((data) => data.word === currentWord)?.hint || null}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 20,
  },
  wordContainer: {
    paddingTop: 30,
    flexDirection: "row",
    marginBottom: 20,
    height: 100,
  },
  wordText: {
    fontSize: 24,
    margin: 5,
    fontSize: 50,
    color: "blue",
  },
  correctLetter: {
    color: "green",
  },
  letterButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  letterButtonChosen: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    margin: 5,
    padding: 10,
    alignItems: "center",
  },
  letterText: {
    color: "#F2F2F2",
    fontSize: 30,
    fontWeight: "bold",
  },
  answerContainer: {
    paddingTop: 20,
    display: "flex",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
