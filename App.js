import "react-native-gesture-handler";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import AddChatScreen from "./screens/AddChatScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
import { ImageProvider } from "./Context";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <ImageProvider>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="AddChat" component={AddChatScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </ImageProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
