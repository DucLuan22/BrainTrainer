import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
const WordGame = () => {
  const [currentWord, setCurrentWord] = useState("S____");
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(300);
  useEffect(() => {
    // Hàm giảm giá trị thời gian sau mỗi giây
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);
  const checkWord = async () => {
    const correctWord = "Song";
    try {
      const response = await fetch(
        `https://od-api.oxforddictionaries.com/api/v2/entries/en/${userInput.toLowerCase()}`,
        {
          headers: {
            app_id: "YOUR_OXFORD_APP_ID",
            app_key: "YOUR_OXFORD_APP_KEY",
          },
        }
      );

      // Chuyển response thành JSON
      const data = await response.json();

      // Kiểm tra xem từ có trong từ điển không
      if (data.results.length > 0) {
        // Từ có nghĩa, cộng điểm
        const wordScore = 100;
        setScore((prevScore) => prevScore + wordScore);
      } else {
        // Từ không có nghĩa, thông báo lỗi
        Alert.alert("Incorrect", "Try again with a valid word!", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error checking word:", error);
    }

    // Chuyển sang từ tiếp theo
    setCurrentWord("S_____");
    setUserInput("");
  };

  const handleInputChange = (text) => {
    setCurrentWord("S" + text.toUpperCase() + "_____");
    setUserInput(text);
  };
  const calculateColor = () => {
    const percentage = (timeRemaining / 300) * 100;
    const hue = ((percentage / 100) * 120).toString(10);
    return `hsl(${hue}, 100%, 50%)`;
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.icons}>
          <AntDesign name="leftcircleo" size={24} color="black" />
          <FontAwesome name="flag" size={24} color="black" />
        </View>
        <View style={styles.icons}>
          <AntDesign name="question" size={24} color="black" />
          <Ionicons name="settings" size={24} color="black" />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <View
          style={{
            width: `${(timeRemaining / 300) * 100}%`,
            height: 20,
            backgroundColor: "lightgray",
            borderRadius: 10,
          }}
        >
          <Text style={styles.timerText}>
            Remaining Time: {Math.floor(timeRemaining / 60)}:
            {timeRemaining % 60 < 10 ? "0" : ""}
            {timeRemaining % 60}
          </Text>
        </View>
      </View>
      <View style={styles.boxContainer}>
        <View style={[styles.boxBar]}>
          <Text style={styles.boxText}>
            Nhập từ thích hợp bắt đầu bằng chữ S:
          </Text>
          <Text style={[styles.inputText]}> {currentWord}</Text>
        </View>
      </View>
      <View style={styles.answerContainer}>
        <TextInput
          style={styles.inputContainer}
          editable
          multiline
          numberOfLines={2}
          placeholder="Nhập từ ở đây"
          maxLength={6}
          onChangeText={handleInputChange}
        />
        <Button
          // onClick = {}
          title="Gửi"
          containerStyle={{
            height: 40,
            width: 10,
            marginHorizontal: 50,
            marginVertical: 10,
            backgroundColor: "yellow",
          }}
          buttonStyle={{ backgroundColor: "rgba(255, 193, 7, 1)" }}
          titleStyle={{
            color: "white",
            marginHorizontal: 20,
            display: "flex",
            justifyContent: "center",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  boxContainer: {
    width: "100%",
    height: 500,
    borderRadius: 5,
    margin: 0,
    overflow: "hidden",
    display: "flex",
    color: "black",
  },
  boxBar: {
    height: "100%",
    backgroundColor: "#FFFFCC",
    marginLeft: "25%",
    marginRight: "25%",
    borderRadius: 20,
  },
  boxText: {
    // width: "100%",
    paddingTop: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  inputText: {
    paddingTop: 40,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  answerContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#FFFFCC",
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    elevation: 0,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WordGame;
