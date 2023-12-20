import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
export default function Timer({ time, gameOver, setGameOver }) {
  const [timeLeft, setTimeLeft] = useState(time);
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      setGameOver(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "center" }}>
        Time Remain: {timeLeft}s
      </Text>
    </View>
  );
}
