import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import GameTopBar from "../../../../components/GameTopBar";

export default function MatchingPair({ navigation, navigation: { goBack } }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingTop: 50 }}>
          <Text style={styles.titleText}> Difficulty LeveLs</Text>
        </View>
        <View>
          <Image style={styles.box} source={require("../assets/avatar.png")} />
        </View>
        <View>
          <Text style={styles.text}>Choose Difficulties</Text>
        </View>
        <View>
          <Text style={styles.text}>Please Choose Your Difficulty </Text>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EasyLevel")}
          >
            <View style={styles.ReturnButton}>
              <Text style={styles.customText}>Easy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("MediumLevel")}
          >
            <View style={styles.ReturnButton}>
              <Text style={styles.customText}>Medium</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("HardLevel")}
          >
            <View style={styles.ReturnButton}>
              <Text style={styles.customText}>Hard</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38226B",
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
    color: "white",
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
    backgroundColor: "#291B59",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
});
