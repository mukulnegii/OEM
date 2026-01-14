import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../constants/colors";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔽 NEW STATES (Health Check)
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const cars = [
    require("../assets/Fortuner.jpeg"),
    require("../assets/Carens.jpg"),
  ];

  // 🧠 Dummy Health Data (Frontend only)
  const healthData = {
    Fortuner: {
      Engine: "Good",
      Battery: "Excellent",
      Brakes: "Average",
    },
    Carens: {
      Engine: "Average",
      Battery: "Good",
      Brakes: "Good",
    },
  };

  // 📅 Appointment Data
  const appointments = {
    "2026-01-05": [
      { time: "11:00 AM", title: "Oil Change" },
      { time: "03:00 PM", title: "Brake Check" },
    ],
    "2026-01-12": [{ time: "11:30 AM", title: "Engine Diagnostics" }],
    "2026-01-21": [{ time: "02:00 PM", title: "Wheel Alignment" }],
  };

  const markedDates = {};
  Object.keys(appointments).forEach((date) => {
    markedDates[date] = { marked: true, dotColor: "#000" };
  });

  const onScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setActiveCarIndex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.card }}>
      {/* 🔝 TOP HEADER */}
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 15,
          right: 15,
          zIndex: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "600" }}>
          Welcome, Ridhi!
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

      {/* 🚗 IMAGE CARD */}
      <View
        style={{
          marginTop: 125,
          marginHorizontal: 15,
          borderRadius: 16,
          backgroundColor: "#f7f7f7",
          elevation: 4,
          overflow: "hidden",
        }}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
        >
          {cars.map((car, index) => (
            <View key={index} style={{ width }}>
              <Image
                source={car}
                style={{
                  width: "100%",
                  height: 220,
                  resizeMode: "cover",
                  marginLeft: -20,
                }}
              />
            </View>
          ))}
        </ScrollView>

        {/* ◯ DOTS */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          {cars.map((_, index) => (
            <View
              key={index}
              style={{
                width: index === activeCarIndex ? 12 : 8,
                height: index === activeCarIndex ? 12 : 8,
                borderRadius: 6,
                marginHorizontal: 5,
                backgroundColor: index === activeCarIndex ? "#000" : "#aaa",
              }}
            />
          ))}
        </View>

        <View style={{ height: 15 }} />
      </View>

      {/* 🔵 HEALTH CHECK BUTTON (NEW) */}
      <TouchableOpacity
        onPress={() => {
          setSelectedCar(null);
          setShowHealthModal(true);
        }}
        style={{
          backgroundColor: "#1E90FF",
          padding: 14,
          borderRadius: 10,
          margin: 15,
          alignItems: "center",
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
            if (appointments[day.dateString]) {
              setSelectedDate(day.dateString);
              setShowModal(true);
            }
          }}
        />
      </View>

      {/* 🧾 APPOINTMENT MODAL */}
      <Modal visible={showModal} transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              Appointments on {selectedDate}
            </Text>
            {appointments[selectedDate]?.map((item, i) => (
              <Text key={i}>• {item.time} — {item.title}</Text>
            ))}
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ color: "#007AFF", marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ❤️ HEALTH CHECK MODAL (NEW) */}
      <Modal visible={showHealthModal} transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" }}>
          <View style={{ backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12 }}>
            {!selectedCar ? (
              <>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  Select Vehicle
                </Text>

                <TouchableOpacity onPress={() => setSelectedCar("Fortuner")}>
                  <Text style={{ marginTop: 10 }}>Fortuner</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedCar("Carens")}>
                  <Text style={{ marginTop: 10 }}>Carens</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {selectedCar} Health
                </Text>

                {Object.entries(healthData[selectedCar]).map(([key, val]) => (
                  <Text key={key}>• {key}: {val}</Text>
                ))}
              </>
            )}

            <TouchableOpacity onPress={() => setShowHealthModal(false)}>
              <Text style={{ color: "#007AFF", marginTop: 15 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
