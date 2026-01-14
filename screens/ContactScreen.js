import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactScreen() {
  const phoneNumber = "+918954276850";

  const callNow = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* CONTACT TEXT */}
      <Text style={styles.contactText}>
        Contact: {phoneNumber}
      </Text>

      {/* CALL BUTTON */}
      <TouchableOpacity style={styles.callButton} onPress={callNow}>
        <Ionicons name="call" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F6FA",
  },

  contactText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
  },

  callButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
