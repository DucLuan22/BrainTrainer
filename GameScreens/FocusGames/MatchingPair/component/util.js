export   const arrayImage = [
  {
    A: require("../assets/1.png"),
    B: require("../assets/2.png"),
    C: require("../assets/3.png"),
    D: require("../assets/4.png"),
    E: require("../assets/5.png"),
    F: require("../assets/6.png"),
    G: require("../assets/7.png"),
    H: require("../assets/8.png"),
    K: require("../assets/9.png"),
    I: require("../assets/10.png"),
  },
];
export function fisherYatesShuffle(arr) {
  let n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}