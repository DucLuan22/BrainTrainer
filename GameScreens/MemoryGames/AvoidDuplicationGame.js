import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GameTopBar from "../../components/GameTopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import MemoryImages from "../../components/MemoryGames/memoryimage";
export default function AvoidDuplicationGame({ navigation: { goBack } }) {
  const [round, setRound] = useState(1);
  useEffect(() => {
    console.log("round", round);
  }, [round]);
  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} text={"Round:" + round} />
      <View style={styles.GamePlay}>
        <MemoryImages setRound={setRound} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  GamePlay: {
    flex: 1,
    backgroundColor: "#82cafa",
    justifyContent: "center",
  },
});
