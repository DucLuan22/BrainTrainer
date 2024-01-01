import { View, Text, StyleSheet} from "react-native";


export default function ScoreDisplay(props){

    return(
        <View style={styles.container}>
        <View style={styles.scoreBox}>
            <Text style={styles.scoreText}>Score:{props.data}</Text>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scoreBox: {
      backgroundColor: 'lightgray',
      padding: 20,
      borderRadius: 50, // Make the border radius half of the width to create an oval shape
      width: 200,
      alignItems: 'center',
    },
    scoreText: {
      fontSize: 18,
      fontWeight: 'bold',
    }
  });