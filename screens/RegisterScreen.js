import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native-elements";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as Crypto from "expo-crypto";
import useImage from "../Context";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [newLocalImage, setNewLocalImage] = useImage();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  const register = async () => {
    let URL;
    if (image) {
      setNewLocalImage(image);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const imageName = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA1,
        email + Date.now().toString()
      );

      const storage = getStorage();
      const imageRef = ref(storage, imageName);

      await uploadBytes(imageRef, blob);
      blob.close();

      URL = await getDownloadURL(imageRef);
      setImageUrl(URL);
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (authUser) => {
        console.log("updatig profile");
        await updateProfile(authUser.user, {
          displayName: name,
          photoURL:
            URL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={styles.container}
        keyboardVerticalOffset={Platform.select({
          ios: () => 0,
          android: () => -100,
        })()}
      >
        <StatusBar style="light" />
        <Text h3 style={{ marginBottom: 30 }}>
          Create a Signal account
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => pickImage()}
            style={{ marginBottom: 15 }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ height: 75, width: 75, borderRadius: 65 }}
              />
            ) : (
              <View
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 65,
                  backgroundColor: "lightgrey",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="camerao" size={24} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <Input
            placeholder="Full Name"
            autoFocus
            type="text"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Email"
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
            onSubmitEditing={register}
          />
        </View>

        <Button
          containerStyle={styles.button}
          onPress={register}
          raised
          title="Register"
        />
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
    alignItems: "center",
    justifyContent: "center",
  },
});
