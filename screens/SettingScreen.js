import React, { useState } from "react";
import { Button, Image, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
function SettingScreen() {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const toggleDarkModeSwitch = () =>
    setIsDarkModeEnabled((previousState) => !previousState);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const toggleNotificationSwitch = () =>
    setIsNotificationEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              source={require("../assets/settings/avatar.png")}
              style={styles.avatarImage}
            />
          </View>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>Dang Duc Luan</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            padding: 10,
            borderRadius: 50,
          }}
        >
          <FontAwesome5Icon
            name="pencil-alt"
            size={25}
            style={{
              backgroundColor: "darkred",
              padding: 10,
              color: "white",
              borderRadius: 100,
            }}
          />
          <View>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>
              Profile Settings
            </Text>
            <Text>Change personal info</Text>
          </View>
          <FontAwesome5Icon name="chevron-right" size={25} />
        </View>
      </View>
      <View>
        <View
          style={{
            backgroundColor: "white",
            borderTopEndRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <FontAwesome5Icon
              name="pencil-alt"
              size={25}
              style={{
                backgroundColor: !isDarkModeEnabled ? "gray" : "black",
                padding: 10,
                color: "white",
                borderRadius: 100,
              }}
            />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "700" }}>Dark Mode</Text>
              <Text>Toggle ON/OFF Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkModeEnabled ? "#81b0ff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkModeSwitch}
              value={isDarkModeEnabled}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderTopWidth: 0.8,
            borderColor: "gray",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <FontAwesome5Icon
              name="bell"
              size={25}
              style={{
                backgroundColor: !isNotificationEnabled ? "gray" : "darkgreen",
                padding: 10,
                color: "white",
                borderRadius: 100,
              }}
            />
            <View>
              <Text style={{ fontSize: 17, fontWeight: "700" }}>
                Notifications
              </Text>
              <Text>Toggle ON/OFF Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isNotificationEnabled ? "#81b0ff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotificationSwitch}
              value={isNotificationEnabled}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          borderTopWidth: 0.8,
          borderColor: "gray",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <FontAwesome5Icon
            name="bell"
            size={25}
            style={{
              backgroundColor: "gray",
              padding: 10,
              color: "white",
              borderRadius: 100,
            }}
          />
          <View>
            <Text style={{ fontSize: 17, fontWeight: "700" }}>Logout</Text>
          </View>
          <FontAwesome5Icon name="chevron-right" size={25} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#092635",
    paddingHorizontal: 12,
    rowGap: 30,
  },
  avatarContainer: {
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 16,
    rowGap: 15,
  },
  avatarImage: {
    width: 60,
    height: 60,
  },
});

const shadowStyles =
  Platform.OS === "android"
    ? {
        elevation: 6,
      }
    : {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      };
