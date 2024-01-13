import { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ScreenEnd } from "./ScreenEnd";
import {arrayImage, fisherYatesShuffle} from './util'
const POINTS_PER_MATCH = 10;

class BoxContent {
  constructor(value) {
    this.value = value;
    this.isSelected = false;
    this.isDead = false;
  }
}

export function HardLevel({ navigation }) {
  function findImageByKey(key) {
    for (let i = 0; i < arrayImage.length; i++) {
      const imageObject = arrayImage[i];
      if (key in imageObject) {
        return imageObject[key];
      }
    }

    return null;
  }

  const [initialBoxes, setInitialBoxes] = useState(fisherYatesShuffle([
    new BoxContent("A"),
    new BoxContent("B"),
    new BoxContent("A"),
    new BoxContent("C"),
    new BoxContent("B"),
    new BoxContent("C"),
    new BoxContent("A"),
    new BoxContent("B"),
    new BoxContent("A"),
    new BoxContent("C"),
    new BoxContent("B"),
    new BoxContent("C"),
    new BoxContent("K"),
    new BoxContent("K"),
    new BoxContent("G"),
    new BoxContent("K"),
    new BoxContent("K"),
    new BoxContent("E"),
    new BoxContent("G"),
    new BoxContent("E"),
  ]));
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);
  const [points, setPoints] = useState(0);
  const onClick = (index) => {
    const newBoxes = [...initialBoxes];
    const clickedBox = newBoxes[index];

    if (selectedBoxIndex === null) {
      clickedBox.isSelected = true;
      setSelectedBoxIndex(index);
    } else {
      const selectedBox = newBoxes[selectedBoxIndex];
      if (selectedBox.value === clickedBox.value) {
        selectedBox.isDead = true;
        clickedBox.isDead = true;
        setPoints(points + POINTS_PER_MATCH);
      } else {
        selectedBox.isSelected = false;
      }
      clickedBox.isSelected = false;
      setSelectedBoxIndex(null);
    }

    setInitialBoxes(newBoxes);
  };

const [level, setLevel] = useState(1);
const isNext = initialBoxes.every((item) => item.isDead);


 const [timeEnd, setTimeEnd] = useState(30);
 useEffect(() => {
   const countdown = setInterval(() => {
     setTimeEnd((prevTime) => prevTime - 1);
   }, 1000);

   if (timeEnd < 1) {
     clearInterval(countdown);
     navigation.navigate("ScreenEnd", { points: points, time: timeEnd });
   }

   return () => clearInterval(countdown);
 }, [timeEnd]);

  useEffect(() => {
    if (level == 4) {
    return navigation.navigate("ScreenEnd", { points: points, time: timeEnd });}
  }, [level]);
if (isNext && level == 1) {
  setInitialBoxes(
    fisherYatesShuffle([
      new BoxContent("A"),
      new BoxContent("B"),
      new BoxContent("A"),
      new BoxContent("C"),
      new BoxContent("B"),
      new BoxContent("C"),
      new BoxContent("A"),
      new BoxContent("B"),
      new BoxContent("A"),
      new BoxContent("C"),
      new BoxContent("B"),
      new BoxContent("C"),
      new BoxContent("D"),
      new BoxContent("D"),
      new BoxContent("I"),
      new BoxContent("I"),
    ])
  );
  setLevel(2);
} else if (isNext && level == 2) {
  setInitialBoxes(
    fisherYatesShuffle([
      new BoxContent("A"),
      new BoxContent("B"),
      new BoxContent("A"),
      new BoxContent("C"),
      new BoxContent("B"),
      new BoxContent("C"),
      new BoxContent("A"),
      new BoxContent("B"),
      new BoxContent("A"),
      new BoxContent("C"),
      new BoxContent("B"),
      new BoxContent("C"),
      new BoxContent("K"),
      new BoxContent("K"),
      new BoxContent("G"),
      new BoxContent("K"),
      new BoxContent("K"),
      new BoxContent("E"),
      new BoxContent("G"),
      new BoxContent("E"),
    ])
  );
  setLevel(3);
} else if (isNext && level == 3) {
  setLevel(4);
}
  return (
    <>
      <View
        style={{
          height: "20%",
          backgroundColor: "#0CB5A2",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text style={styles.scoreText}>Score: {points}</Text>
        <Text style={{ alignSelf: "center" }}>Time: {timeEnd}</Text>
      </View>

      <View style={styles.container}>
        {initialBoxes.map((item, index) => (
          <Box
            key={index}
            {...item}
            onClick={() => onClick(index)}
            link={findImageByKey(item.value)}
          />
        ))}
      </View>
    </>
  );
}

function Box(props) {
  const { value, isSelected, isDead, onClick, link } = props;

  return (
    <TouchableOpacity onPress={onClick} disabled={isSelected}>
      <Image
        style={[
          styles.box,
          isSelected && styles.selectedBox,
          isDead && { opacity: 0 },
        ]}
        source={link}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 25,
    flexWrap: "wrap",
  },
  box: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderColor: "blue",
    borderWidth: 2,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBox: {
    borderColor: "red",
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
});
