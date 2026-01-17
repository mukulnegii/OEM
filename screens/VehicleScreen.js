import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";

export default function VehicleScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle</Text>

      <View style={styles.grid}>
        {/* ADD VEHICLE */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("AddVehicle")}
        >
          <Text style={styles.icon}>➕</Text>
          <Text style={styles.label}>Add Vehicle</Text>
        </TouchableOpacity>

        {/* MANAGE VEHICLE */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ManageVehicle")}
        >
          <Text style={styles.icon}>⚙️</Text>
          <Text style={styles.label}>Manage Vehicles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 140,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
