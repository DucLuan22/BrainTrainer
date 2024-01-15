import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function ScrambledWords({ navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingTop: 50 }}>
        <Text style={styles.titleText}> Level</Text>
      </View>
      <View>
        <Image style={styles.box} source={require("../assets/word-find.png")} />
      </View>
      <View>
        <Text style={styles.text}>Difficulty</Text>
      </View>
      <View>
        <Text style={styles.text}>Please choose difficulty </Text>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EasyLevelScrambledWords")}
        >
          <View style={styles.ReturnButton}>
            <Text style={styles.customText}>Easy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("MediumLevelScrambledWords")}
        >
          <View style={styles.ReturnButton}>
            <Text style={styles.customText}>Medium</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("HardLevelScrambledWords")}
        >
          <View style={styles.ReturnButton}>
            <Text style={styles.customText}>Hard</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  customText: { color: "#fff", paddingTop: 0, fontSize: 20 },
  titleText: {
    marginTop: "400px",
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    marginTop: "400px",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  box: {
    marginTop: 50,
    resizeMode: "contain",
    height: 300,
    width: 300,
  },
  box: {
    marginTop: 20,
    resizeMode: "contain",
    height: 300,
    width: 300,
  },
  ReturnButton: {
    marginTop: 20,
    borderRadius: 15,
    width: 300,
    height: 70,
    backgroundColor: "#ffd873",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
});
