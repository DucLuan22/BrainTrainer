import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FindTheSum() {
   const [indexNumberArray, setIndexNumberArray] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const [totalTrue, setTotalTrue] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const numberLv1 = [
    [5, 4, 3, 8, 7],
    [6, 3, 8, 1, 4],
    [8, 9, 7, 1, 6],
    [4, 5, 9, 5, 2],
    [7, 6, 1, 3, 2],
    [4, 8, 1, 3, 2],
    [4, 6, 9, 3, 7],
    [2, 3, 5, 6, 9, 1],
    [8, 1, 6, 2, 5, 3],
    [1, 7, 3, 4, 2, 5],
    [8, 9, 3, 5, 6, 4],
    [9, 5, 8, 7, 5, 6],
    [2, 3, 1, 4, 5, 9],
    [9, 6, 7, 8, 5, 3],
  ];

  const numberLv2 = [
    [98, 81, 84, 92, 16],
    [33, 66, 82, 51, 49],
    [57, 40, 99, 52, 43],
    [91, 23, 68, 77, 90],
    [83, 17, 91, 95, 41],
    [27, 78, 66, 17, 22],
    [19, 60, 30, 66, 34],
    [35, 18, 34, 38, 40, 66],
    [68, 25, 22, 47, 75, 46],
    [73, 70, 49, 15, 24, 76],
    [67, 49, 64, 48, 36, 82],
    [52, 72, 26, 11, 28, 17],
    [52, 72, 26, 11, 28, 17],
    [68, 25, 22, 47, 75, 46],
  ];
  // if (totalTrue >= numberLv1.length-2) {
  //   level = 2;
  // }
  if (indexNumberArray == numberLv1.length) {
    if (totalTrue >= numberLv1.length - 2) {
      setLevel(2);
      setIndexNumberArray(0);
      setTotalTrue(0);
    } else {
      setGameOver(true);
    }
  }
  console.log({ indexNumberArray });

  function BeginGame() {
    setStart(!start);
    setTime(120);
    setGameOver(false);
    setIndexNumberArray(0);
    setTotalTrue(0);
    setScore(0);
  }
  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.container}>
      {gameOver ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "red",
              fontWeight: "bold",
            }}
          >
            Game Over!
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "red",
              fontWeight: "bold",
              marginBottom: 40,
            }}
          >
            Your Score:{score}
          </Text>
          <Text
            style={{ fontSize: 30, color: "red", fontWeight: "bold" }}
            onPress={() => BeginGame()}
          >
            Click here to Restart!
          </Text>
        </View>
      ) : (
        <>
          {start ? (
            <>
              <ImageBackground
                source={
                  level == 1
                    ? {
                        uri: "https://i.pinimg.com/originals/3b/ef/27/3bef27693c812b4762a9f363231ad5d2.jpg",
                      }
                    : {
                        uri: "https://w0.peakpx.com/wallpaper/433/86/HD-wallpaper-android-apps-929-app-gray-grey-icon-logo-minimal-neutral-pattern.jpg",
                      }
                }
                resizeMode="cover"
                style={{
                  justifyContent: "center",
                  height: 220,
                  alignContent: "center",
                  textAlign: "center",
                  width: 415,
                  paddingBottom: 20,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    marginTop: 20,
                    textAlign: "center",
                  }}
                >
                  Level:{level}
                </Text>
                <Timer
                  time={time}
                  gameOver={gameOver}
                  setGameOver={setGameOver}
                />
                <Text style={styles.header}>
                  {level == 1 ? (
                    <Text style={{ fontSize: 20, fontStyle: "italic" }}>
                      Find two numbers whose sum is a multiple-of-ten.
                    </Text>
                  ) : (
                    <Text style={{ fontSize: 20, fontStyle: "italic" }}>
                      Find two numbers whose sum is a multiple-of-hunderd
                    </Text>
                  )}
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    color: "blue",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Score:{score}
                </Text>
              </ImageBackground>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "blue",
                    paddingTop: 20,
                  }}
                >
                  Question: {indexNumberArray}/{numberLv1.length}, Correct
                  Answer: {totalTrue}/{indexNumberArray}
                </Text>
              </View>
              <GuestNumberList
                numbers={
                  level == 1
                    ? numberLv1[indexNumberArray]
                    : numberLv2[indexNumberArray]
                }
                indexNumberArray={indexNumberArray}
                score={score}
                setScore={setScore}
                setIndexNumberArray={setIndexNumberArray}
                totalTrue={totalTrue}
                setTotalTrue={setTotalTrue}
              />
            </>
          ) : (
            <>
              <Text
                style={{ fontSize: 30, color: "red", fontWeight: "bold" }}
                onPress={() => BeginGame()}
              >
                Start Game
              </Text>
            </>
          )}
        </>
      )}
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0FFF0",
  },
  header: {
    fontSize: 18,
    paddingBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
});
export default GuestNumber;
