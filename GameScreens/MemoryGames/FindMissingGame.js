import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

export default function FindMissingGame({ navigation: { goBack } }) {
  const images = [
    require("../../assets/animal/images(1).jpeg"),
    require("../../assets/animal/images(2).jpeg"),
    require("../../assets/animal/images(3).jpeg"),
    require("../../assets/animal/images(4).jpeg"),
    require("../../assets/animal/images(5).jpeg"),
    require("../../assets/animal/images(6).jpeg"),
    require("../../assets/animal/images(7).jpeg"),
    require("../../assets/animal/images(8).jpeg"),
    require("../../assets/animal/images(9).jpeg"),
    require("../../assets/animal/images(10).jpeg"),
    require("../../assets/animal/images(11).jpeg"),
    require("../../assets/animal/images(12).jpeg"),
    require("../../assets/animal/images(13).jpeg"),
    require("../../assets/animal/images(14).jpeg"),
    require("../../assets/animal/images(15).jpeg"),
    require("../../assets/animal/images(16).jpeg"),
    require("../../assets/animal/images(17).jpeg"),
    require("../../assets/animal/images(18).jpeg"),
    require("../../assets/animal/images(19).jpeg"),
    require("../../assets/animal/images(20).jpeg"),
    require("../../assets/animal/images(21).jpeg"),
    require("../../assets/animal/images(22).jpeg"),
    require("../../assets/animal/images(23).jpeg"),
  ];

  const [countdown, setCountdown] = useState(6);
  const [secondCountdown, setSecondCountdown] = useState(15);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [secondCountdownFinished, setSecondCountdownFinished] = useState(false);
  const [imageID, setImageID] = useState([]);
  const [randomImageID, setRandomImageID] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOption] = useState([]);
  const [numberOfQuestionMark, setnumberOfQuestionMark] = useState(1);
  const [round, setRound] = useState(1);
  const [point, setPoint] = useState(0);
  const [noOfRandomOptions, setNoOfRandomOptions] = useState(4);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  function selectRandomElements(arr, count) {
    if (arr.length < count) {
      throw new Error(
        "Array length should be at least the count of elements to select"
      );
    }

    const randomIndexes = new Set();
    while (randomIndexes.size < count) {
      randomIndexes.add(Math.floor(Math.random() * arr.length));
    }

    const selectedElements = [...randomIndexes].map((index) => arr[index]);
    return selectedElements;
  }

  function placeRandomly(arr1, numElements) {
    const uniqueSet = new Set();

    // Add unique elements from arr1 to the set
    arr1.forEach((element) => uniqueSet.add(element));

    // Add additional unique random numbers until reaching the desired count
    while (uniqueSet.size < numElements) {
      const randomNumber = Math.floor(Math.random() * 22) + 1;
      uniqueSet.add(randomNumber);
    }

    const uniqueArray = Array.from(uniqueSet);

    for (let i = uniqueArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueArray[i], uniqueArray[j]] = [uniqueArray[j], uniqueArray[i]];
    }

    return uniqueArray;
  }

  useEffect(() => {
    if (countdownFinished === false) {
      setImageID(generateRandomNumbers(5));
      const timer1 = setTimeout(() => {
        setCountdownFinished(true);
      }, countdown * 1000);

      return () => clearTimeout(timer1);
    }
    if (countdownFinished === true) {
      setRandomImageID([
        ...selectRandomElements(imageID, numberOfQuestionMark),
      ]);
    }
  }, [countdownFinished, numberOfQuestionMark]);

  useEffect(() => {
    if (randomImageID.length > 0) {
      setOptions([...placeRandomly(randomImageID, noOfRandomOptions)]);
    }
  }, [randomImageID]);

  useEffect(() => {
    if (countdownFinished) {
      const timer2 = setInterval(() => {
        setSecondCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);

      return () => {
        clearInterval(timer2);
        setSecondCountdownFinished(true);
      };
    }
  }, [countdownFinished]);

  useEffect(() => {
    if (secondCountdown === 0) {
      setIsTimeUp(true);
    } else {
      setIsTimeUp(false);
    }
    if (secondCountdown == 0 && round === 10) {
      handleGameOver();
      setRound(1);
    }
  }, [secondCountdown]);

  useEffect(() => {
    if (countdownFinished && isTimeUp) {
      handleNext();
    }
  }, [countdownFinished, isTimeUp, isGameOver]);

  const generateRandomNumbers = (count) => {
    const min = 1;
    const max = 22;
    const generatedNumbers = new Set();

    while (generatedNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      generatedNumbers.add(randomNumber);
    }

    const uniqueNumbersArray = Array.from(generatedNumbers);
    return uniqueNumbersArray;
  };

  useEffect(() => {
    if (countdownFinished) {
      if (round >= 1 && round <= 4) {
        setnumberOfQuestionMark(1);
        setNoOfRandomOptions(4);
        setSecondCountdown(10);
      } else if (round >= 5 && round <= 8) {
        setnumberOfQuestionMark(2);
        setNoOfRandomOptions(6);
        setSecondCountdown(15);
      } else if (round >= 9 && round <= 10) {
        setnumberOfQuestionMark(3);
        setNoOfRandomOptions(8);
        setSecondCountdown(20);
      }
    }
  }, [countdownFinished, round]);

  const handleSelectImage = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOption((prevState) => [...prevState, option]);
    } else {
      setSelectedOption((prevState) => [
        ...prevState.filter((e) => e !== option),
      ]);
    }
  };

  function handleNext() {
    Alert.alert(
      "Round " + round + " Is Over",
      "Press 'Next' to move on",
      [
        {
          text: "Next",
          onPress: () => {
            resetStates();
            setRound(round + 1);
          },
        },
      ],
      { cancelable: false }
    );
  }
  function handleGameOver() {
    setIsGameOver(true);
    Alert.alert(
      "Game Over",
      "Would you like to try again?",
      [
        {
          text: "Try Again",
          onPress: () => {
            resetStates();
            setRound(1);
            setIsGameOver(false);
            setPoint(0);
          },
        },
        {
          text: "Exit",
          onPress: () => {
            goBack();
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }
  const resetStates = () => {
    setCountdown(6);
    setSecondCountdown(15);
    setCountdownFinished(false);
    setSecondCountdownFinished(false);
    setImageID(generateRandomNumbers(5));
    setRandomImageID([]);
    setOptions([]);
    setSelectedOption([]);
  };

  const checkResults = () => {
    const sortedRandomImageID = [...randomImageID].sort();
    const sortedSelectedOptions = [...selectedOptions].sort();
    const result =
      JSON.stringify(sortedRandomImageID) ===
      JSON.stringify(sortedSelectedOptions);

    if (round < 11) {
      setPoint(point + result ? 200 : 0);
      resetStates();
      setSecondCountdownFinished(false);
      handleNext();
      setIsGameOver(false);
    }

    if (round === 10) {
      Alert.alert(
        "Game Over",
        `You've reached the final round. Your Score is ${point}. Would you like to try again?`,
        [
          {
            text: "Try Again",
            onPress: () => {
              resetStates();
              setRound(1);
              setIsGameOver(false);
              setPoint(0);
            },
          },
          {
            text: "Exit",
            onPress: () => {
              goBack();
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity key={index} onPress={(e) => handleSelectImage(option)}>
        <Image
          key={index}
          style={{
            height: 70,
            width: 70,
            resizeMode: "contain",
            borderColor: "blue",
            borderWidth: selectedOptions.includes(option) ? 1 : 0,
          }}
          source={images[option]}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView>
      <GameTopBar goBack={goBack} text={"Round " + round} />
      <View style={styles.numbersContainer}>
        {!countdownFinished && (
          <Text style={styles.timerText}> Remember These Images</Text>
        )}
        {countdownFinished && (
          <Text style={styles.timerText}>
            Time Remaining: {secondCountdown}
          </Text>
        )}
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Point: {point}</Text>
        <View style={styles.row}>
          {imageID.map((number, index) =>
            randomImageID.includes(number) ? (
              <Image
                key={index}
                style={{ height: 70, width: 70 }}
                source={require("../../assets/animal/question-mark.png")}
              />
            ) : (
              <Image
                key={index}
                style={{
                  height: 70,
                  width: 70,
                  resizeMode: "contain",
                }}
                source={images[number]}
              />
            )
          )}
        </View>
      </View>
      {countdownFinished && (
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Choose the Missing Images
        </Text>
      )}
      <View style={styles.optionsContainer}>
        {countdownFinished && options.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {renderOptions()}
          </View>
        )}
      </View>

      {countdownFinished && (
        <View style={styles.centeredButtonContainer}>
          <Button
            style={styles.checkButton}
            title="Check"
            onPress={checkResults}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Change to your preferred background color
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    gap: 5,
  },
  text: {
    fontSize: 24,
    marginBottom: 15,
    marginHorizontal: 8,
    fontFamily: "Roboto",
  },
  questionMark: {
    fontWeight: "bold",
    color: "red",
  },
  timerText: {
    fontSize: 22,
    marginBottom: 15,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 20,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    fontSize: 18,
    fontFamily: "Roboto",
  },
  replacedNumberContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  replacedNumberText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
    fontFamily: "Roboto",
  },
  centeredButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  checkButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "blue",
    borderRadius: 8,
    fontSize: 18,
    fontFamily: "Roboto",
    color: "white",
  },
});
