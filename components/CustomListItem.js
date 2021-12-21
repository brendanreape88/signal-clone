import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db } from "../firebase";
import {
  setDoc,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(query(collection(db, "chats", id, "messages"), orderBy("timestamp", "desc")), (snapshot) => {
      const chatMessages = [];

      snapshot.forEach((doc) => {
        chatMessages.push(doc.data());
      });

      setChatMessages(chatMessages);
    });

    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        {chatMessages?.length > 0 && (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
