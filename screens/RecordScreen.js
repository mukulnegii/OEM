import { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../constants/colors";

export default function RecordScreen() {
  const [activeTab, setActiveTab] = useState("service");
  const [detectedHealth, setDetectedHealth] = useState(null);

  /* 🔹 Load detected health data when screen is focused */
  useFocusEffect(
    useCallback(() => {
      loadDetectedHealth();
    }, [])
  );

  const loadDetectedHealth = async () => {
    try {
      const data = await AsyncStorage.getItem("DETECTED_HEALTH");
      if (data) {
        setDetectedHealth(JSON.parse(data));
      } else {
        setDetectedHealth(null);
      }
    } catch (e) {
      console.log("Failed to load detected health", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔲 SQUARE TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "service" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("service")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "service" &&
                styles.activeTabText,
            ]}
          >
            Service Record
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "detected" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("detected")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "detected" &&
                styles.activeTabText,
            ]}
          >
            Detected
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📄 CONTENT */}
      <View style={styles.content}>
        {activeTab === "service" ? (
          <View style={styles.serviceList}>
            {/* Service 1 */}
            <View style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceTitle}>
                   1st Car Service
                </Text>
                <Text style={styles.serviceDate}>
                   12 Jan 2026
                </Text>
              </View>
              <Text style={styles.serviceSubtitle}>
                Routine inspection & oil change
              </Text>
            </View>

            {/* Service 2 */}
            <View style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <Text style={styles.serviceTitle}>
                   Brake Pads Replacement
                </Text>
                <Text style={styles.serviceDate}>
                   15 Jan 2026
                </Text>
              </View>
              <Text style={styles.serviceSubtitle}>
                Front & rear brake pads replaced
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.detectedBox}>
            {detectedHealth ? (
              <>
                <Text style={styles.vehicleName}>
                  🚗 {detectedHealth.vehicleName}
                </Text>

                <Text style={styles.detectedText}>
                  Engine Failure Probability:{" "}
                  {(detectedHealth.engine_failure_probability * 100).toFixed(1)}%
                </Text>

                <Text style={styles.detectedText}>
                  Bearing Failure Probability:{" "}
                  {(detectedHealth.bearing_failure_probability * 100).toFixed(1)}%
                </Text>

                <Text style={styles.detectedText}>
                  Driving Stress Index:{" "}
                  {detectedHealth.driving_stress_index}/100
                </Text>
              </>
            ) : (
              <Text style={styles.noDataText}>
                No detected health data yet
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 65,
    paddingHorizontal: 16,
  },

  /* Tabs */
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  tab: {
    width: "48%",
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
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

  /* Content */
  content: {
    flex: 1,
    alignItems: "center",
  },

  /* Service Records */
  serviceList: {
    width: "100%",
  },
  serviceCard: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  serviceDate: {
    fontSize: 12,
    color: "#64748B",
  },
  serviceSubtitle: {
    fontSize: 13,
    color: "#475569",
  },

  /* Detected */
  detectedBox: {
    backgroundColor: "#F8FAFC",
    padding: 20,
    borderRadius: 12,
    width: "100%",
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#0F172A",
  },
  detectedText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#1E293B",
  },
  noDataText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});
