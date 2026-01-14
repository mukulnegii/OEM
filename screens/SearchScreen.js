import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SAMPLE_DATA = [
  "Engine Health",
  "Bearing Status",
  "Vehicle Stress",
  "Battery Health",
  "Brake Condition",
  "Oil Level",
  "Temperature Sensor",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const filteredData = SAMPLE_DATA.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search vehicle data..."
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      {/* 📋 Results */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 65,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
  },
});
