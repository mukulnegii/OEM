import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

const FILTERS = ["Service", "Parts", "Others"];

const DATA = {
  Service: [
    "Engine Health",
    "Battery Check",
    "Brake Inspection",
  ],
  Parts: [
    "Oil Filter",
    "Brake Pads",
    "Air Filter",
  ],
  Others: [
    "Insurance",
    "RC Details",
    "Pollution Check",
  ],
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Service");

  const filteredData = DATA[activeFilter].filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 🔍 SEARCH BAR */}
      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      {/* 🧭 FILTER TABS */}
      <View style={styles.tabContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setActiveFilter(filter)}
            style={[
              styles.tab,
              activeFilter === filter && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeFilter === filter &&
                  styles.activeTabText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📋 RESULTS */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No results found
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
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
    marginBottom: 12,
    fontSize: 16,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  activeTabText: {
    color: "#fff",
  },

  /* List */
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
