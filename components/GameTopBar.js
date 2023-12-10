import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import Carousel from "react-native-reanimated-carousel";
export default function GameTopBar({ goBack, text }) {
  const [isModalVisible, setIsModelVisible] = useState(false);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const tutorialData = [
    {
      gif: require("../assets/game-tutorial/placeholder.gif"),
      description:
        "1. Duis consequat dolore nostrud ut nostrud minim sit. Non commodo velit ad pariatur aliqua adipisicing qui est irure .",
    },
    {
      gif: require("../assets/game-tutorial/placeholder.gif"),
      description:
        "2. Duis consequat dolore nostrud ut nostrud minim sit. Non commodo velit ad pariatur aliqua adipisicing qui est irure .",
    },
    {
      gif: require("../assets/game-tutorial/placeholder.gif"),
      description:
        "3. Duis consequat dolore nostrud ut nostrud minim sit. Non commodo velit ad pariatur aliqua adipisicing qui est irure .",
    },
  ];
  return (
    <View style={styles.container}>
      <AntDesign
        name="caretleft"
        size={30}
        color={"black"}
        onPress={() =>
          Alert.alert("Warning!", "Do you want to exist the game?", [
            { text: "Yes", onPress: () => goBack() },
            { text: "Cancel", onPress: () => null },
          ])
        }
      />
      <Text style={styles.titleText}>{text}</Text>
      <AntDesign
        name="questioncircle"
        size={30}
        color={"black"}
        onPress={() => setIsModelVisible(true)}
      />
      <Modal visible={isModalVisible}>
        <Pressable onPress={() => setIsModelVisible(false)}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Skip
            </Text>
          </View>
        </Pressable>
        {/* <Carousel /> */}
        <Carousel
          width={width}
          height={height - 30}
          autoPlay={false}
          data={tutorialData}
          scrollAnimationDuration={1000}
          renderItem={({ index, item }) => (
            <View style={styles.contentContainer}>
              <Image
                source={item.gif}
                style={{ width: "100%", height: "75%" }}
              />
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                {item.description}
              </Text>
            </View>
          )}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "flex-end",
    margin: "3%",
    marginRight: 40,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: "4%",
    paddingHorizontal: 15,
    rowGap: 20,
  },
});
