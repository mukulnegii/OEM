import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/colors";

export default function ScheduleScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    loadAppointments();
  }, []);

  /* ---------- LOAD ---------- */
  const loadAppointments = async () => {
    const data = await AsyncStorage.getItem("APPOINTMENTS");
    setAppointments(data ? JSON.parse(data) : {});
  };

  /* ---------- LOCAL DATE FORMAT (NO UTC BUG) ---------- */
  const formatDateLocal = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  /* ---------- PICKERS ---------- */
  const onDateChange = (_, selected) => {
    setShowDatePicker(false);
    if (selected) setDate(selected);
  };

  const onTimeChange = (_, selected) => {
    setShowTimePicker(false);
    if (selected) setTime(selected);
  };

  /* ---------- SAVE ---------- */
  const saveSchedule = async () => {
    if (!title || !date || !time) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const dateKey = formatDateLocal(date);
    const timeStr = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = { ...appointments };
    const entry = { title, time: timeStr };

    updated[dateKey] = updated[dateKey]
      ? [...updated[dateKey], entry]
      : [entry];

    await AsyncStorage.setItem(
      "APPOINTMENTS",
      JSON.stringify(updated)
    );

    setAppointments(updated);
    setTitle("");
    setDate(null);
    setTime(null);

    Alert.alert("Success", "Appointment scheduled");
  };

  /* ---------- DELETE (DOUBLE CONFIRM) ---------- */
  const deleteAppointment = (dateKey, index) => {
    Alert.alert(
      "Delete Appointment",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () =>
            Alert.alert(
              "Final Confirmation",
              "This cannot be undone",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async () => {
                    const updated = { ...appointments };
                    updated[dateKey].splice(index, 1);
                    if (updated[dateKey].length === 0) {
                      delete updated[dateKey];
                    }
                    await AsyncStorage.setItem(
                      "APPOINTMENTS",
                      JSON.stringify(updated)
                    );
                    setAppointments(updated);
                  },
                },
              ]
            ),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Schedule Appointment</Text>

      {/* TITLE */}
      <TextInput
        placeholder="Title (e.g. Oil Change)"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* DATE */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={{ color: date ? "#000" : "#999" }}>
          {date ? date.toDateString() : "Select Date"}
        </Text>
      </TouchableOpacity>

      {/* TIME */}
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.input}
      >
        <Text style={{ color: time ? "#000" : "#999" }}>
          {time
            ? time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Select Time"}
        </Text>
      </TouchableOpacity>

      {/* SAVE */}
      <TouchableOpacity style={styles.btn} onPress={saveSchedule}>
        <Text style={styles.btnText}>Save Appointment</Text>
      </TouchableOpacity>

      {/* ---------- MANAGE ---------- */}
      <Text style={styles.manageTitle}>Manage Appointments</Text>

      {Object.keys(appointments).length === 0 && (
        <Text style={styles.empty}>
          No appointments scheduled
        </Text>
      )}

      {Object.entries(appointments).map(([dateKey, list]) => (
        <View key={dateKey} style={styles.dateGroup}>
          <Text style={styles.dateText}>{dateKey}</Text>

          {list.map((item, index) => (
            <View key={index} style={styles.card}>
              {/* 🔴 DELETE AT TOP RIGHT */}
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() =>
                  deleteAppointment(dateKey, index)
                }
              >
                <Text style={styles.deleteText}>Cancel</Text>
              </TouchableOpacity>

              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text style={styles.cardTime}>
                {item.time}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {/* PICKERS */}
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={
            Platform.OS === "ios" ? "inline" : "default"
          }
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display={
            Platform.OS === "ios" ? "spinner" : "default"
          }
          onChange={onTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 25,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  manageTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  empty: {
    textAlign: "center",
    color: "#666",
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateText: {
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    position: "relative",
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  cardTime: {
    color: "#555",
  },
  deleteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: "700",
  },
});
