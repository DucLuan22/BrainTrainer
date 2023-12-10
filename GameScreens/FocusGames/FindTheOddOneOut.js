import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameTopBar from "../../components/GameTopBar";

export default function FindTheOddOneOut({ navigation: { goBack } }) {
  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <Text>FindTheOddOneOut</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
