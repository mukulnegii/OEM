import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getBotReply } from "../services/helpdeskBot";

export default function HelpdeskScreen() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      id: "1",
      sender: "bot",
      text: "Hey! How can I help u? 😊",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: message,
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: getBotReply(message),
    };

    setChat([...chat, userMsg, botMsg]);
    setMessage("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hey! How can I help u?</Text>
      </View>

      {/* CHAT AREA */}
      <FlatList
        data={chat}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />

      {/* INPUT AREA */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 38,
  },

  header: {
    padding: 15,
    backgroundColor: "#1E90FF",
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  chatContainer: {
    padding: 10,
  },

  messageBubble: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },

  userBubble: {
    backgroundColor: "#1E90FF",
    alignSelf: "flex-end",
  },

  botBubble: {
    backgroundColor: "#E5E5EA",
    alignSelf: "flex-start",
  },

  messageText: {
    color: "#000",
  },

  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
