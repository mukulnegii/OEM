import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function VehicleScreen() {
  const [activeTab, setActiveTab] = useState(null); // 👈 IMPORTANT
  const [vehicles, setVehicles] = useState([]);

  const [vehicleName, setVehicleName] = useState("");
  const [regNumber, setRegNumber] = useState("");

  const addVehicle = () => {
    if (!vehicleName || !regNumber) {
      Alert.alert(
        "Missing Details",
        "Please enter vehicle name and registration number"
      );
      return;
    }

    const newVehicle = {
      id: Date.now().toString(),
      name: vehicleName,
      regNumber,
    };

    setVehicles([...vehicles, newVehicle]);
    setVehicleName("");
    setRegNumber("");

    Alert.alert("Success", "Vehicle added successfully");
  };

  const deleteVehicle = (id) => {
    Alert.alert(
      "Delete Vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setVehicles(vehicles.filter((v) => v.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Management</Text>

      {/* 🔘 ADD / DELETE BUTTONS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "add" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("add")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "add" && styles.activeText,
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "delete" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("delete")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "delete" && styles.activeText,
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      {/* ➕ ADD FORM (ONLY WHEN ADD PRESSED) */}
      {activeTab === "add" && (
        <View style={styles.form}>
          <TextInput
            placeholder="Vehicle Name"
            value={vehicleName}
            onChangeText={setVehicleName}
            style={styles.input}
          />

          <TextInput
            placeholder="Registration Number"
            value={regNumber}
            onChangeText={setRegNumber}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={addVehicle}
          >
            <Text style={styles.saveText}>Save Vehicle</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ❌ DELETE LIST (ONLY WHEN DELETE PRESSED) */}
      {activeTab === "delete" && (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No vehicles to delete
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.vehicleName}>
                🚗 {item.name}
              </Text>
              <Text style={styles.label}>
                Reg No: {item.regNumber}
              </Text>

              <TouchableOpacity
                onPress={() => deleteVehicle(item.id)}
                style={styles.deleteBtn}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 150,
  },

  tabContainer: {
    marginBottom: 20,
  },
  tab: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    marginBottom: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  activeText: {
    color: "#fff",
  },

  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  label: {
    color: COLORS.textDark,
    marginBottom: 10,
  },
  deleteBtn: {
    alignSelf: "flex-end",
  },
  deleteText: {
    color: COLORS.danger,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textMuted,
    marginTop: 40,
  },
});
