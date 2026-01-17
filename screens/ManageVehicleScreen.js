import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/colors";

export default function ManageVehicleScreen() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await AsyncStorage.getItem("VEHICLES");
    if (data) setVehicles(JSON.parse(data));
  };

  const deleteVehicle = (id) => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = vehicles.filter((v) => v.id !== id);
            setVehicles(updated);
            await AsyncStorage.setItem(
              "VEHICLES",
              JSON.stringify(updated)
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Vehicles</Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No vehicles added
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* 🔴 DELETE AT TOP RIGHT */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteVehicle(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>

            <Text style={styles.name}>🚗 {item.name}</Text>
            <Text style={styles.regText}>{item.reg}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    position: "relative",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  regText: {
    color: "#475569",
  },

  /* Delete button */
  deleteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "700",
  },
});
