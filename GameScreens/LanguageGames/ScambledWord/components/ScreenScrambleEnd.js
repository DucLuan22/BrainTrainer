import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export function ScreenScrambleEnd({ route, navigation }) {
  const time = 0;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.titleText}> Chúc mừng!</Text>
        <Text style={styles.customText}>Bạn đã hoàn thành màn chơi</Text>
      </View>
      <View>
        <Image style={styles.box} source={require("../assets/thumpnail.png")} />
      </View>
      <View style={styles.headerText}>
        <Text style={styles.customText}>Điểm: {route.params.score}</Text>
        <Text style={styles.customText}>Thời gian: {route.params.time}</Text>
      </View>
      <View style={{ paddingTop: 50 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.ReturnButton}>
            <Text style={[styles.customText, { color: "#fff", paddingTop: 0 }]}>
              Trở về màn hình chính
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    marginTop: 50,
  },
  titleText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  customText: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "400",
  },
  box: {
    marginTop: 50,
    resizeMode: "contain",
    height: 300,
    width: 300,
  },
  ReturnButton: {
    borderRadius: 15,
    width: 300,
    height: 70,
    backgroundColor: "#351C5E",
    justifyContent: "center",
    alignItems: "center",
  },
});
