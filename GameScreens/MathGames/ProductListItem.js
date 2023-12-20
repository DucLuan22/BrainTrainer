import React, { useState } from "react";
import Toast from "react-native-toast-message";
import { View, Text, Pressable, StyleSheet, Alert, Image } from "react-native";

export default function ProductListItem({
  title,
  expr,
  id,
  calCulateScore,
  score,
  begin,
  product,
  time,
  setTime,
  streak,
  setStreak,
  level,
  setLevel,
  totalCorrect,
  setTotalCorrect,
  render,
  setRender,
}) {
  const [renderCount, setRenderCount] = useState(3);
  const [index, setIndex] = useState(0);
  // Toast.setConfig({
  //   autoHide: true,
  //   visibilityTime: 1000, // Auto-hide duration in milliseconds (1 second)
  // });

  const handleOnPress = (item, id) => {
    setRender(render + 1);

    if (begin) {
      var result = false;

      function calculation() {
        const price = eval(expr[0]);

        switch (id) {
          case 0:
            // console.log({ price });
            // console.log(eval(product[1].expr[render]));
            if (price < eval(product[1].expr[render])) {
              result = true;
            } else {
              result = false;
            }
            break;
          case 1:
            if (price < eval(product[0].expr[render])) {
              result = true;
            } else {
              result = false;
            }
            break;
          default:
            return false;
        }
      }
      calculation();

      if (result === true) {
        setStreak(streak + 1);
        setTotalCorrect(totalCorrect + 1);
        if (streak % 5 == 0) {
          Toast.show({
            type: "success",
            text2: "Win streak! bonus +10s",
          });
          setTime(time + 10);
        }
        score += 100 * level;
        calCulateScore(score);
        Toast.show({
          type: "success",
          text1: "Correct",
        });
      }
      if (result === false) {
        setStreak(1);
        setTime(time - 2);
        Toast.show({
          type: "error",
          text1: "Incorrect",
        });
      }
    } else {
      Alert.alert("Click start to begin");
    }
    console.log({ streak });
  };

  return (
    <View style={styles.productItemContainer}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: `${title}`,
        }}
      />

      <View style={styles.productItemInnerContainer}>
        {expr.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleOnPress(item, id)}
            android_ripple={{ color: "blue" }}
            disabled={false}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                fontWeight: "bold",
                width: 180,
                borderWidth: 2,
                borderColor: "#7B68EE",
                borderRadius: 10,
              }}
            >
              {item} $
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 130,
    padding: 10,
  },

  productItemInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 10,
  },
  pressableView: {
    flex: 1,
    backgroundColor: "powderblue",
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    color: "black",
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
});

