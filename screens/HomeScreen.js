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
  const cars = [
    require("../assets/Fortuner.jpeg"),
    require("../assets/Carens.jpg"),
  ];
  // 📅 Appointment Data (dummy)
  const appointments = {
    "2026-01-05": [
      { time: "11:00 AM", title: "Oil Change" },
      { time: "03:00 PM", title: "Brake Check" },
    ],
    "2026-01-12": [
      { time: "11:30 AM", title: "Engine Diagnostics" },
    ],
    "2026-01-21": [
      { time: "02:00 PM", title: "Wheel Alignment" },
    ],
  };
  
  // 🔵 Mark calendar dates
  const markedDates = {};
  Object.keys(appointments).forEach((date) => {
    markedDates[date] = { marked: true, dotColor: "#000" };
  });

  // 🔁 Handle image swipe
  const onScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / width
    );
    setActiveCarIndex(index);
  }; 

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.card }}>
        {/* ☰ HAMBURGER */}
        {/* 🔝 TOP HEADER */}
    <View
    style={{
        position: "absolute",
        top: 45,
        left: 15,
        right: 15,
        zIndex: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        }}
    >
        <Text
        style={{
            fontSize: 22,
            fontWeight: "600",
            color: COLORS.textDark,
        }}
    >
        Welcome, User
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
          zIndex: 1,
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
              {/* IMAGE TOUCHES TOP + LEFT + RIGHT */}
              <View
                style={{
                  height: 220,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={car}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    marginLeft: -20,
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* ◯ DOT INDICATORS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {cars.map((_, index) => {
            const active = index === activeCarIndex;
            return (
              <View
                key={index}
                style={{
                  width: active ? 12 : 8,
                  height: active ? 12 : 8,
                  borderRadius: 6,
                  marginHorizontal: 5,
                  borderWidth: 2,
                  borderColor: active ? "#000" : "#aaa",
                  backgroundColor: active ? "#000" : "transparent",
                }}
              />
            );
          })}
        </View>

        {/* GAP BELOW IMAGE (~2 cm) */}
        <View style={{ height: 15 }} />
      </View>


      {/* 📅 CALENDAR (ALWAYS VISIBLE) */}
      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => {
            if (appointments[day.dateString]) {
              setSelectedDate(day.dateString);
              setShowModal(true);
            }
          }}
          theme={{
            todayTextColor: "#000",
            arrowColor: "#000",
            dotColor: "#000",
            selectedDayBackgroundColor: "#000",
            selectedDayTextColor: "#fff",
          }}
        />
      </View>

      {/* 🧾 APPOINTMENT MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
              Appointments on {selectedDate}
            </Text>

            {appointments[selectedDate]?.map((item, index) => (
              <Text key={index} style={{ marginBottom: 8 }}>
                • {item.time} — {item.title}
              </Text>
            ))}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                marginTop: 15,
                alignSelf: "flex-end",
              }}
            >
              <Text style={{ color: "#007AFF", fontWeight: "600" }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}