import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Setting Screen</Text>
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});