import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "Ridhi Sharma",
    age: "22",
    email: "ridhi@gmail.com",
    mobile: "+91 9876543210",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{user.age}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.value}>{user.mobile}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  label: {
    width: "30%",
    fontWeight: "bold",
    color: "#1E293B",
  },

  value: {
    width: "70%",
    color: "#475569",
  },
});
