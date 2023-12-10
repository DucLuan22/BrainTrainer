import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "./screens/SettingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import DailyScreen from "./screens/DailyScreen";
import GameSelectionScreen from "./screens/GameSelectionScreen";
import SequenceGameScreen from "./GameScreens/MemoryGames/SequenceGameScreen";
import HomeScreen from "./screens/HomeScreen";
import FindMissingGame from "./GameScreens/MemoryGames/FindMissingGame";
import AvoidDuplicationGame from "./GameScreens/MemoryGames/AvoidDuplicationGame";
import FindTheOddOneOut from "./GameScreens/FocusGames/FindTheOddOneOut";
import MatchingPair from "./GameScreens/FocusGames/MatchingPair";
import CatchingFish from "./GameScreens/FocusGames/CatchingFish";
import FindTheNextWord from "./GameScreens/LanguageGames/FindTheNextWord";
import FindTheRemainingLetter from "./GameScreens/LanguageGames/FindTheRemainingLetter";
import LinkWords from "./GameScreens/LanguageGames/LinkWords";
import ScrambledWords from "./GameScreens/LanguageGames/ScrambledWords";
import FindTheSum from "./GameScreens/MathGames/FindTheSum";
import ShoppingGame from "./GameScreens/MathGames/ShoppingGame";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Daily"
        component={DailyScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon name="calendar-check" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5Icon name="home" size={size} color={color} />
          ),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTabStack} />
          <Stack.Screen
            name="Games"
            component={GameSelectionScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen name="sequence-game" component={SequenceGameScreen} />
          <Stack.Screen name="find-missing-game" component={FindMissingGame} />
          <Stack.Screen
            name="avoid-duplicate-game"
            component={AvoidDuplicationGame}
          />
          <Stack.Screen
            name="find-the-odd-one-game"
            component={FindTheOddOneOut}
          />
          <Stack.Screen name="matching-pair-game" component={MatchingPair} />
          <Stack.Screen name="catching-fish" component={CatchingFish} />
          <Stack.Screen name="find-next-word" component={FindTheNextWord} />
          <Stack.Screen
            name="find-remain-letter"
            component={FindTheRemainingLetter}
          />
          <Stack.Screen name="link-words" component={LinkWords} />
          <Stack.Screen name="scramble-words" component={ScrambledWords} />

          <Stack.Screen name="find-sum" component={FindTheSum} />
          <Stack.Screen name="shopping-game" component={ShoppingGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
