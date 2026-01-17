import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = Math.round(width * 0.56);

export default function HomeScreen() {
  const navigation = useNavigation();

  const [vehicles, setVehicles] = useState([]);
  const [appointments, setAppointments] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeHealthIndex, setActiveHealthIndex] = useState(0);

  /* 🔹 ML States (from Code 2) */
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthData, setHealthData] = useState(null);

  /* 🔹 Load data on focus */
  useFocusEffect(
    useCallback(() => {
      loadVehicles();
      loadAppointments();
    }, [])
  );

  const loadVehicles = async () => {
    try {
      const data = await AsyncStorage.getItem("VEHICLES");
      setVehicles(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log(e);
    }
  };

  const loadAppointments = async () => {
    try {
      const data = await AsyncStorage.getItem("APPOINTMENTS");
      setAppointments(data ? JSON.parse(data) : {});
    } catch (e) {
      console.log(e);
    }
  };

  /* 🔹 ML Fetch Function */
  const fetchHealthData = async (vehicle) => {
    setLoadingHealth(true);
    setHealthData(null);

    try {
      const response = await fetch("http://192.168.1.14:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          engine_temperature: 115,
          oil_pressure: 18,
          vibration_level: 0.92,
          rpm: 4500,
          harsh_braking_count: 14,
          harsh_acceleration_count: 16,
        }),
      });

      const data = await response.json();
      setHealthData(data);

      await AsyncStorage.setItem(
        "DETECTED_HEALTH",
        JSON.stringify({
          vehicleName: vehicle.name,
          timestamp: new Date().toISOString(),
        ...data,
        })
      );
    } catch (error) {
      setHealthData({ error: "Failed to fetch health data" });
    } finally {
      setLoadingHealth(false);
    }
  };

  /* 🔹 Calendar Marks */
  const markedDates = {};
  Object.keys(appointments).forEach((date) => {
    markedDates[date] = {
      marked: true,
      dotColor: COLORS.primary,
    };
  });

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.card }}>
      {/* 🔝 HEADER */}
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 15,
          right: 15,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}>
          Welcome Ridhi!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 25,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* 🚗 VEHICLE CAROUSEL */}
      <View style={{ marginTop: 120 }}>
        {vehicles.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {vehicles.map((v) => (
              <TouchableOpacity
                key={v.id}
                delayLongPress={300}
                onLongPress={() => {
                  setSelectedVehicle(v);
                  setShowVehicleModal(true);
                }}
                style={{ width, paddingHorizontal: 15 }}
              >
                <Image
                  source={{ uri: v.imageUri }}
                  style={{
                    width: "100%",
                    height: IMAGE_HEIGHT,
                    borderRadius: 16,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            No vehicles added yet
          </Text>
        )}
      </View>

      {/* ❤️ HEALTH CHECK BUTTON */}
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.primary,
          padding: 14,
          borderRadius: 10,
          margin: 15,
          alignItems: "center",
        }}
        onPress={() => {
          setShowHealthModal(true);
          if (vehicles.length > 0) {
            fetchHealthData(vehicles[0]);
          }
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Health Check
        </Text>
      </TouchableOpacity>

      {/* 📅 CALENDAR */}
      <View style={{ paddingHorizontal: 15 }}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setShowCalendarModal(true);
          }}
        />
      </View>

      {/* 📆 CALENDAR MODAL */}
      <Modal visible={showCalendarModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{selectedDate}</Text>

            {appointments[selectedDate]?.length ? (
              appointments[selectedDate].map((a, i) => (
                <Text key={i}>• {a.time} — {a.title}</Text>
              ))
            ) : (
              <Text>No appointments</Text>
            )}

            <TouchableOpacity onPress={() => setShowCalendarModal(false)}>
              <Text style={{ marginTop: 12 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 🚗 VEHICLE DETAILS MODAL */}
      <Modal visible={showVehicleModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Vehicle Details</Text>
            <Text>🚗 {selectedVehicle?.name}</Text>
            <Text>🔢 {selectedVehicle?.regOrEngine}</Text>

            <TouchableOpacity onPress={() => setShowVehicleModal(false)}>
              <Text style={{ marginTop: 20, color: COLORS.primary }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ❤️ HEALTH CHECK MODAL */}
      <Modal visible={showHealthModal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "#fff", height: "70%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ padding: 15, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                {vehicles[activeHealthIndex]?.name || "Vehicle"}
              </Text>
              <TouchableOpacity onPress={() => setShowHealthModal(false)}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              pagingEnabled
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / width);
                setActiveHealthIndex(index);
                fetchHealthData(vehicles[index]);
              }}
            >
              {vehicles.map((v) => (
                <View key={v.id} style={{ width, padding: 20 }}>
                  <Image source={{ uri: v.imageUri }} style={{ height: 160, borderRadius: 12 }} />

                  <View style={{ backgroundColor: "#f5f5f5", padding: 15, borderRadius: 12, marginTop: 20 }}>
                    <Text style={{ fontWeight: "600" }}>Vehicle Health</Text>

                    {loadingHealth && <ActivityIndicator style={{ marginTop: 20 }} />}

                    {!loadingHealth && healthData && !healthData.error && (
                      <>
                        <Text>Engine Failure: {(healthData.engine_failure_probability * 100).toFixed(1)}%</Text>
                        <Text>Bearing Failure: {(healthData.bearing_failure_probability * 100).toFixed(1)}%</Text>
                        <Text>Driving Stress: {healthData.driving_stress_index}/100</Text>
                      </>
                    )}

                    {!loadingHealth && healthData?.error && (
                      <Text style={{ color: "red" }}>{healthData.error}</Text>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}