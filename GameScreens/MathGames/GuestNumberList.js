
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

export default function GuestNumberList({
  numbers,
  indexNumberArray,
  setIndexNumberArray,
  score,
  setScore,
  totalTrue,
  setTotalTrue,
}) {
  const [IndexNumber, setIndexNumber] = useState([]);
  // const IndexNumber = [];

  const [notify, setNotify] = useState("");
  const handleOnPress = (index) => {
    // if (IndexNumber.length < 2) {
    IndexNumber.push(index);

    // setIndexNumber(index);
    // if (IndexNumber.length == 2) {
    //   IndexNumber[0] = index;
    // }
    // console.log(IndexNumber);
  };

  const checkSum = () => {
    const sum =
      numbers[IndexNumber[IndexNumber.length - 1]] +
      numbers[[IndexNumber[IndexNumber.length - 2]]];
    console.log({ sum });
    if (sum % 10 === 0 || sum % 100 === 0) {
      setIndexNumberArray(indexNumberArray + 1);
      setTotalTrue(totalTrue + 1);
      setScore(score + 100);
      setNotify(
        `Congratulations! ${numbers[IndexNumber[IndexNumber.length - 1]]} + ${
          numbers[[IndexNumber[IndexNumber.length - 2]]]
        } = ${sum} is a multiple of 10`
      );
      setIndexNumber([]);

      return;
    }
    setIndexNumberArray(indexNumberArray + 1);
    setNotify(
      "Try again! No pair found with the sum being a multiple of 10, 100."
    );
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 40,
      }}
    >
      <FlatList
        data={numbers}
        renderItem={(itemData) => (
          <Pressable
            style={styles.pressableView}
            onPress={() => handleOnPress(itemData.index)}
            android_ripple={{ color: "blue" }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
            >
              {itemData.item}
            </Text>
          </Pressable>
        )}
        numColumns="2"
      />

      <View
        style={{
          marginBottom: 40,

          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            alignContent: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: "bold",
            backgroundColor: "#FFE4E1",
            textAlign: "center",
            width: 200,
            borderWidth: 1,
          }}
          onPress={() => checkSum()}
        >
          Check
        </Text>
      </View>
      <Text style={styles.resultText}>{notify}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  pressableView: {
    // flex: 1,
    backgroundColor: "powderblue",
    width: 190,
    borderRadius: 40,
    borderWidth: 1,
    marginTop: 10,
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    display: "flex",
  },
  resultText: {
    marginBottom: 30,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
