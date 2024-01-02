import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

const ScrambledWords = ({ navigation: { goBack } }) => {
  const words = ["APPLE", "ORANGE", "BANANA", "MANGO", "PEAR"];
  const [selectedLetters, setSelectedLetters] = useState("");
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [points, setPoints] = useState(0);

  const shuffleWord = (word) => {
    const shuffledWord = word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return shuffledWord;
  };

  const selectLetter = (letter, index) => {
    const updatedDisabledLetters = [...disabledLetters];
    const letterIndex = updatedDisabledLetters.indexOf(index);

    if (letterIndex !== -1) {
      updatedDisabledLetters.splice(letterIndex, 1);
      setSelectedLetters(selectedLetters.replace(letter, ""));
    } else {
      setSelectedLetters(selectedLetters + letter);
      updatedDisabledLetters.push(index);
    }

    setDisabledLetters(updatedDisabledLetters);
  };

  const removeSelectedLetter = (letter) => {
    const updatedDisabledLetters = [...disabledLetters];
    const selectedLetterIndex = selectedLetters.indexOf(letter);

    if (selectedLetterIndex !== -1) {
      const correspondingIndex = updatedDisabledLetters[selectedLetterIndex];
      const filteredDisabledLetters = updatedDisabledLetters.filter(
        (index) => index !== correspondingIndex
      );
      setDisabledLetters(filteredDisabledLetters);
    }

    const newSelectedLetters = selectedLetters.replace(letter, "");
    setSelectedLetters(newSelectedLetters);
  };

  const checkWord = () => {
    const formattedSelectedLetters = selectedLetters.trim().toUpperCase();
    const foundWord = words.find((word) => word === formattedSelectedLetters);

    if (foundWord) {
      alert("Correct word! You earned 10 points!");
      setPoints(points + 10);

      if (wordIndex + 1 < words.length) {
        setWordIndex(wordIndex + 1);
        setCurrentWord(shuffleWord(words[wordIndex + 1]));
        setSelectedLetters("");
        setDisabledLetters([]);
      } else {
        alert("Congratulations! You've completed all the words.");
      }
    } else {
      alert("Incorrect word. Try again!");
      setSelectedLetters("");
      setDisabledLetters([]);
    }
  };

  const generateLetterButtons = () => {
    const word = currentWord.split("");
    return word.map((letter, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.letterButton,
          disabledLetters.includes(index) && styles.disabledButton,
        ]}
        onPress={() => selectLetter(letter, index)}
        disabled={disabledLetters.includes(index)}
      >
        <Text>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  const renderSelectedLetters = () => {
    return selectedLetters.split("").map((letter, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => removeSelectedLetter(letter)}
      >
        <Text style={{ fontSize: 30 }}>{letter}</Text>
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    setCurrentWord(shuffleWord(words[0]));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <View style={styles.content}>
        <Text style={styles.selectedWord}>{renderSelectedLetters()}</Text>
        <View style={styles.wordContainer}>{generateLetterButtons()}</View>

        <TouchableOpacity style={styles.checkButton} onPress={checkWord}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
        <Text style={styles.pointsText}>Points: {points}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  letterButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  selectedWord: {
    flexDirection: "row",
    fontSize: 30,
    marginBottom: 20,
  },
  checkButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  checkButtonText: {
    color: "white",
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pointsText: {
    marginTop: 20,
    fontSize: 20,
  },
});

export default ScrambledWords;
