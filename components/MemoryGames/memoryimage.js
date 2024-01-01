import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  Image,
} from "react-native";
import ScoreDisplay from "./scoredisplay";
import { Images } from "./ListImages";

export default function MemoryImages({ setRound }) {
  const defaultLevel = 3;
  const initLevel = 1;
  const [squares, setSquares] = useState([]);
  // const [initData,setInitDate] = useState([]);
  const [memorySquare, setmemorySquare] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(defaultLevel);
  const [level, setLevel] = useState(initLevel);
  const [score, setScore] = useState(0);

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Create a copy of the original array to avoid mutation
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const generateSquares = () => {
    // const animals = [
    //   "Dog",
    //   "Cat",
    //   "Elephant",
    //   "Lion",
    //   "Tiger",
    //   "Bear",
    //   "Deer",
    //   "Rabbit",
    //   "Fox",
    //   "Giraffe",
    // ]; // Adjust the number of squares as needed
    const newSquares = Array.from({ length: Images.length }, (_, index) => ({
      id: index,
      image: Images[index],
    }));
    return newSquares;
  };

  setRound(level);
  // setSquares([]);
  const initState = async () => {
    const initData = await generateSquares();
    setRound(level);
    console.log("init State", currentLevel);
    setSquares(shuffleArray(initData.slice(0, currentLevel)));
    setSquares(shuffleArray(initData.slice(0, currentLevel)));
  };
  const resetGame = async () => {
    setmemorySquare([]);
    setCurrentLevel(defaultLevel);
    setLevel(initLevel);
    setScore(0);
    const initData = await generateSquares();
    setSquares(initData.slice(0, 3));
  };
  // condition for game win or lose
  const showAnnouncementLose = () => {
    Alert.alert("loss", "Enter an item", [
      { text: "OK", onPress: () => resetGame() },
    ]);
  };
  // const showAnnouncementPass = () => {
  //   Alert.alert("pass", "Enter an item", [{ text: "OK" ,onPress: () =>levelUp()}]);

  // };

  const handlePessImages = async (square) => {
    try {
      //check condition to pass or lose
      if (memorySquare.includes(square.image)) {
        showAnnouncementLose();
      } else {
        const newMemory = [...memorySquare];
        newMemory.push(square.image);
        setmemorySquare(newMemory);
        console.log(memorySquare);
        setLevel(level + 1);
        setScore(score + 100);
        setCurrentLevel(currentLevel + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initState();
  }, [currentLevel]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
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
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          {squares.map((square) => (
            <TouchableOpacity
              key={square.id}
              style={[styles.square, { backgroundColor: square.color }]}
              onPress={() => handlePessImages(square)}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={square.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
  },
  square: {
    width: 100, // Adjust the square size as needed
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 5,
  },
});
