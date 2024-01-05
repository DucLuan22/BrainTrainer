import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import ProductListItem from "./ProductListItem"
import { useNavigation } from "@react-navigation/native";

export const productLv1 = [
  {
    title:
      "https://www.drawingnow.com/file/videos/steps/120209/how-to-draw-a-watch-step-9.jpg",
    expr: [
      (expr1 = "5"),
      (expr2 = "1"),
      (expr3 = "5"),
      (expr4 = "13"),
      (expr5 = "2"),
      (expr6 = "15"),
    ],
    id: 0,
  },
  {
    title:
      "https://static.vecteezy.com/system/resources/previews/025/433/187/original/kids-drawing-illustration-wrist-watch-flat-cartoon-isolated-vector.jpg",
    expr: [
      (expr1 = "20"),
      (expr2 = "3"),
      (expr3 = "6"),
      (expr4 = "3"),
      (expr5 = "18"),
      (expr6 = "30"),
    ],
    id: 1,
  },
];

export const productLv2 = [
  {
    title:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJhcGOcMP7l5wtGBNrZXbSzuffHbhGnIKxsg&usqp=CAU",
    expr: [
      (expr1 = "10+5"),
      (expr2 = "20+1"),
      (expr3 = "10+4"),
      (expr4 = "10+1"),
      (expr5 = "2+2"),
      (expr6 = "15+15"),
    ],
    id: 0,
  },
  {
    title:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSeecnXMiU6kzpvZ-ZPO-bdnUlF_a4W4b8an_eD6XJi33xWTaL5JkeYsw18CHnLaAPRRU&usqp=CAU",
    expr: [
      (expr1 = "20"),
      (expr2 = "3"),
      (expr3 = "15"),
      (expr4 = "3"),
      (expr5 = "18"),
      (expr6 = "33"),
    ],
    id: 1,
  },
];

export const productLv3 = [
  {
    title:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpykFshCdc3YfyBGrRT-F-hazhJ8vJXjQrw&usqp=CAU",
    expr: [
      (expr1 = "10+5"),
      (expr2 = "20-1"),
      (expr3 = "10+5"),
      (expr4 = "10+1"),
      (expr5 = "2+2"),
      (expr6 = "15+15"),
    ],
    id: 0,
  },
  {
    title:
      "https://img.pikbest.com/png-images/qiantu/cartoon-hand-drawn-whole-wheat-bread-design-elements_2592119.png!sw800",
    expr: [
      (expr1 = "20+5"),
      (expr2 = "3*1"),
      (expr3 = "15/6"),
      (expr4 = "1*6"),
      (expr5 = "2+18"),
      (expr6 = "30-3"),
    ],
    id: 1,
  },
];
export const productLv4 = [
  {
    title:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSXtbRCwbAr_06pmYkZqi4Wh6Ec5RaX4i7GA&usqp=CAU",
    expr: [
      (expr1 = "(15*2)-1"),
      (expr2 = "(27/2)-1"),
      (expr3 = "(7*2)+4"),
      (expr4 = "(18+5)-2"),
      (expr5 = "(18/3)-3"),
      (expr6 = "(20/5)*8"),
    ],
    id: 0,
  },
  {
    title:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAHKnNzwnZtiNxBvwPZU0c4hfmgGBUlmXe8A&usqp=CAU",
    expr: [
      (expr1 = "((3*5)+6)-2"),
      (expr2 = "((21+7)/2)+10"),
      (expr3 = "((21-4)+7)/2"),
      (expr4 = "((24/3)*2)-2"),
      (expr5 = "((4*6)/2)-3"),
      (expr6 = "((5+6)/2)+6"),
    ],
    id: 1,
  },
];

export default function ShoppingGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [time, setTime] = useState(0);
  const [begin, setBegin] = useState(false);
  const [streak, setStreak] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [title, setTitle] = useState(false);
  const navigation = useNavigation();
  const [render, setRender] = useState(0);
  function calCulateScore(score) {
    setScore(score);
  }
  const startGame = () => {
    setTime(60); // Set initial time for each round
    setScore(0);
    setBegin(true);
    setGameOver(false);
    setTitle(!title);
    setStreak(1);
    setLevel(1);
    setRender(0);
    setTotalCorrect(0);
  };
  const reStartGame = () => {
    setTitle(false);
    setTime(0);
    setRender(0);
    setStreak(1);
    setLevel(1);
    setScore(0);
    setBegin(false);
  };
  useEffect(() => {
    let timer;
    if (time > 0 && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setGameOver(true);

      clearInterval(timer);
      setTitle(false);
      setStreak(1);
      setRender(0);
      setLevel(1);
      setTotalCorrect(0);
    }
    return () => clearInterval(timer);
  }, [time, gameOver]);
  if (render == 6) {
    if (totalCorrect > 4) {
      Alert.alert("Next level");
      setTotalCorrect(0);
      setLevel(level + 1);
      setRender(0);
    } else {
      setGameOver(true);
      setRender(0);
    }
  }

  if (level === 1) {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.start}>
              {title ? (
                <Text
                  onPress={reStartGame}
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Restart
                </Text>
              ) : (
                `Start Game`
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {gameOver && title ? (
          <View
            style={{
              width: 420,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.timer}>Game Over!</Text>
            <Text style={styles.timer}>Level: {level}</Text>
            <Text style={styles.score}>Score:{score}</Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://w0.peakpx.com/wallpaper/433/86/HD-wallpaper-android-apps-929-app-gray-grey-icon-logo-minimal-neutral-pattern.jpg",
              }}
              resizeMode="cover"
              style={{ justifyContent: "center", height: 200 }}
            >
              <View
                style={{
                  width: 420,
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text style={styles.timer}>Level: {level}</Text>
                <Text style={styles.timer}>Time remain: {time}</Text>
                <Text style={styles.score}>Score:{score}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#F08080",
                  }}
                >
                  Question: {begin ? render : `0`}/6, Correct Answer:{" "}
                  {totalCorrect}/{render}
                </Text>
              </View>
            </ImageBackground>

            <View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 20, fontStyle: "italic", paddingTop: 20 }}
              >
                Choose the lower price of product
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {productLv1.map((item) => (
                <ProductListItem
                  title={item.title}
                  expr={item.expr.slice(render, render + 1)}
                  render={render}
                  setRender={setRender}
                  key={item.id}
                  id={item.id}
                  score={score}
                  begin={begin}
                  calCulateScore={calCulateScore}
                  product={productLv1}
                  time={time}
                  setTime={setTime}
                  level={level}
                  setLevel={setLevel}
                  streak={streak}
                  setStreak={setStreak}
                  totalCorrect={totalCorrect}
                  setTotalCorrect={setTotalCorrect}
                />
              ))}
            </View>
          </View>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("NumberGuest");
          }}
        >
          <Text>Number Guest</Text>
        </Pressable>
      </View>
    );
  } else if (level == 2) {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.start}>
              {title ? (
                <Text
                  onPress={reStartGame}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Re Start
                </Text>
              ) : (
                `Start Game`
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {gameOver ? (
          <View
            style={{
              width: 420,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.timer}>Game Over!</Text>
            <Text style={styles.timer}>Level: {level}</Text>
            <Text style={styles.score}>Score:{score}</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#F08080",
              }}
            >
              Correct Answer: {totalCorrect}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://img.freepik.com/premium-vector/wave-liquid-background-abstract-vibrant-poster-web-element_41901-2696.jpg",
              }}
              resizeMode="cover"
              style={{ justifyContent: "center", height: 200 }}
            >
              <View
                style={{
                  width: 420,
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text style={styles.timer}>Level: {level}</Text>
                <Text style={styles.timer}>Time remain: {time}</Text>
                <Text style={styles.score}>Score:{score}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#F08080",
                  }}
                >
                  Question: {render}/6, Correct Answer: {totalCorrect}/{render}
                </Text>
              </View>
            </ImageBackground>

            <View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 20, fontStyle: "italic", paddingTop: 20 }}
              >
                Choose the lower price of product
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {productLv2.map((item) => (
                <ProductListItem
                  title={item.title}
                  expr={item.expr.slice(render, render + 1)}
                  render={render}
                  setRender={setRender}
                  key={item.id}
                  id={item.id}
                  score={score}
                  begin={begin}
                  calCulateScore={calCulateScore}
                  product={productLv2}
                  time={time}
                  setTime={setTime}
                  level={level}
                  setLevel={setLevel}
                  streak={streak}
                  setStreak={setStreak}
                  totalCorrect={totalCorrect}
                  setTotalCorrect={setTotalCorrect}
                />
              ))}
            </View>
          </View>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("NumberGuest");
          }}
        >
          <Text>Number Guest</Text>
        </Pressable>
      </View>
    );
  } else if (level == 3) {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.start}>
              {title ? (
                <Text
                  onPress={reStartGame}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Re Start
                </Text>
              ) : (
                `Start Game`
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {gameOver ? (
          <View
            style={{
              width: 420,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.timer}>Game Over!</Text>
            <Text style={styles.timer}>Level: {level}</Text>
            <Text style={styles.score}>Score:{score}</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#F08080",
              }}
            >
              Correct Answer: {totalCorrect}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://i.stack.imgur.com/5rVml.png",
              }}
              resizeMode="cover"
              style={{ justifyContent: "center", height: 200 }}
            >
              <View
                style={{
                  width: 420,
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text style={styles.timer}>Level: {level}</Text>
                <Text style={styles.timer}>Time remain: {time}</Text>
                <Text style={styles.score}>Score:{score}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#F08080",
                  }}
                >
                  Question: {render}/6, Correct Answer: {totalCorrect}/{render}
                </Text>
              </View>
            </ImageBackground>

            <View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 20, fontStyle: "italic", paddingTop: 20 }}
              >
                Choose the lower price of product
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {productLv3.map((item) => (
                <ProductListItem
                  title={item.title}
                  expr={item.expr.slice(render, render + 1)}
                  render={render}
                  setRender={setRender}
                  key={item.id}
                  id={item.id}
                  score={score}
                  begin={begin}
                  calCulateScore={calCulateScore}
                  product={productLv3}
                  time={time}
                  setTime={setTime}
                  level={level}
                  setLevel={setLevel}
                  streak={streak}
                  setStreak={setStreak}
                  totalCorrect={totalCorrect}
                  setTotalCorrect={setTotalCorrect}
                />
              ))}
            </View>
          </View>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("NumberGuest");
          }}
        >
          <Text>Number Guest</Text>
        </Pressable>
      </View>
    );
  } else if (level == 4) {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={startGame}>
            <Text style={styles.start}>
              {title ? (
                <Text
                  onPress={reStartGame}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Re Start
                </Text>
              ) : (
                `Start Game`
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {gameOver ? (
          <View
            style={{
              width: 420,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Text style={styles.timer}>Game Over!</Text>
            <Text style={styles.timer}>Level: {level}</Text>
            <Text style={styles.score}>Score:{score}</Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#F08080",
              }}
            >
              Correct Answer: {totalCorrect}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://i.pinimg.com/originals/3b/ef/27/3bef27693c812b4762a9f363231ad5d2.jpg",
              }}
              resizeMode="cover"
              style={{ justifyContent: "center", height: 200 }}
            >
              <View
                style={{
                  width: 420,
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text style={styles.timer}>Level: {level}</Text>
                <Text style={styles.timer}>Time remain: {time}</Text>
                <Text style={styles.score}>Score:{score}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    color: "#F08080",
                  }}
                >
                  Question: {render}/6, Correct Answer: {totalCorrect}/{render}
                </Text>
              </View>
            </ImageBackground>

            <View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 20, fontStyle: "italic", paddingTop: 20 }}
              >
                Choose the lower price of product
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              {productLv4.map((item) => (
                <ProductListItem
                  title={item.title}
                  expr={item.expr.slice(render, render + 1)}
                  render={render}
                  setRender={setRender}
                  key={item.id}
                  id={item.id}
                  score={score}
                  begin={begin}
                  calCulateScore={calCulateScore}
                  product={productLv4}
                  time={time}
                  setTime={setTime}
                  level={level}
                  setLevel={setLevel}
                  streak={streak}
                  setStreak={setStreak}
                  totalCorrect={totalCorrect}
                  setTotalCorrect={setTotalCorrect}
                />
              ))}
            </View>
          </View>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("NumberGuest");
          }}
        >
          <Text>Number Guest</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  score: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    color: "#FA8072",
  },
  timer: {
    fontWeight: "bold",
    color: "#FFA07A",
    fontSize: 25,
    marginTop: 20,
  },
  start: {
    fontWeight: "bold",
    color: "#DC143C",
    backgroundColor: "#FFA07A",
    borderWidth: 1,
    fontSize: 35,
    marginTop: 20,
    alignContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#DCDCDC",
  },
});
