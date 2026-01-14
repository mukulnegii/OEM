import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const RECORDS = [
  { id: 1, title: "Engine Health Check", date: "2026-01-12" },
  { id: 2, title: "Bearing Inspection", date: "2026-01-10" },
  { id: 3, title: "Vehicle Stress Analysis", date: "2026-01-08" },
  { id: 4, title: "Oil Level Service", date: "2026-01-05" },
];

export default function RecordScreen() {
  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cellSno}>{index + 1}</Text>
      <Text style={styles.cellTitle}>{item.title}</Text>
      <Text style={styles.cellDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerCellSno}>S.NO.</Text>
        <Text style={styles.headerCellTitle}>Title</Text>
        <Text style={styles.headerCellDate}>Date</Text>
      </View>

      {/* Records */}
      <FlatList
        data={RECORDS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerCellSno: {
    width: "15%",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerCellTitle: {
    width: "55%",
    fontWeight: "bold",
  },
  headerCellDate: {
    width: "30%",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cellSno: {
    width: "15%",
    textAlign: "center",
    color: "#334155",
  },
  cellTitle: {
    width: "55%",
    color: "#0F172A",
  },
  cellDate: {
    width: "30%",
    textAlign: "center",
    color: "#475569",
  },
});
