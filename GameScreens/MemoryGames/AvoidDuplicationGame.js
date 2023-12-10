import { View, Text, StyleSheet } from "react-native";
import React from "react";
import GameTopBar from "../../components/GameTopBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AvoidDuplicationGame({ navigation: { goBack } }) {
  return (
    <SafeAreaView style={styles.container}>
      <GameTopBar goBack={goBack} />
      <Text>AvoidDuplicationGame</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
