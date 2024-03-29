import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Box,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../../../components/GameTopBar";
const wordsData = [
  {
    word: "addition",
    hint: "Math operation for combining numbers",
  },
  {
    word: "subtraction",
    hint: "Math operation for finding the difference between numbers",
  },
  {
    word: "division",
    hint: "Math operation for splitting a quantity into equal parts",
  },
  {
    word: "equals",
    hint: "Symbol used to indicate that two expressions have the same value",
  },
  {
    word: "sum",
    hint: "The result of adding two or more numbers",
  },
  {
    word: "product",
    hint: "The result of multiplying two or more numbers",
  },
  {
    word: "quotient",
    hint: "The result of dividing one number by another",
  },
  {
    word: "numerator",
    hint: "The top part of a fraction representing the number of parts being considered",
  },
  {
    word: "denominator",
    hint: "The bottom part of a fraction representing the total number of equal parts",
  },
  {
    word: "remainder",
    hint: "The amount left over after dividing one number by another, often expressed as 'X remainder Y.'",
  },
];

class BoxContent {
  constructor(value) {
    this.value = value;
    this.isSelected = false;
    this.isReturn = false;
  }
}

export const EasyScrambleLevel = ({ navigation, navigation: { goBack } }) => {
  const [currentWord, setCurrentWord] = useState("a");
  const [shuffledWord, setShuffledWord] = useState("");
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [orderedSelectedLetters, setOrderedSelectedLetters] = useState([]);
  const [remainingWords, setRemainingWords] = useState([...wordsData]);
  const [score, setScore] = useState(0);
  const [initialBoxes, setInitialBoxes] = useState([]);

  const shuffleLetters = (letters) => {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  useEffect(() => {
    setTimeEnd(20);
  }, [score]);

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
      navigation.navigate("ScreenEndScrambledWords", {
        score: score,
        time: timeEnd,
      });
    }
  };
  const [timeEnd, setTimeEnd] = useState(20);
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeEnd((prevTime) => prevTime - 1);
    }, 1000);

    if (timeEnd < 1) {
      clearInterval(countdown);
      navigation.navigate("ScreenEnd", { score: score, time: timeEnd });
    }

    return () => clearInterval(countdown);
  }, [timeEnd]);

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

  const handleRemoveLetter = (index) => {
    console.log([...orderedSelectedLetters.splice(index)]);
  };
  return (
    <SafeAreaView>
      <GameTopBar goBack={goBack} />
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
        <Text style={{ alignSelf: "center" }}>Time: {timeEnd}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.wordContainer}>
          {initialBoxes.map((item, index) => (
            <Pressable>
              <Text
                key={index}
                style={[
                  styles.wordText,
                  orderedSelectedLetters[index] ? styles.correctLetter : null,
                ]}
              >
                {orderedSelectedLetters[index] || "_"}
              </Text>
            </Pressable>
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
