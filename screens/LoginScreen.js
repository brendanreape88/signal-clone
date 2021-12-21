import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Welcome to Signal",
    });
  }, [navigation]);

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(error);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={{
            uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
          }}
          style={{ width: 200, height: 200 }}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <Button containerStyle={styles.button} onPress={signIn} title="Login" />
        <Button
          containerStyle={styles.button}
          type="outline"
          onPress={() => navigation.navigate("Register")}
          title="Register"
        />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
  logo: {},
  input: {
    width: 300,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 10,
  },
});
